import { Component, ElementRef, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { LoadingService, LoadingServiceManager, LanguageService, ThemeService, Assets } from '@ts-core/frontend';
import { ExtendedError, Transport, TransportHttpCommandAsync, LoggerWrapper, Logger, LoggerLevel, LoadableEvent, ObjectUtil } from '@ts-core/common';
import { WindowService, ApplicationComponent, ViewUtil, LoginServiceBaseEvent, LoginNotGuard, LoginGuard } from '@ts-core/angular';
import { RouterService, SettingsService, LoginService } from '@core/service';
import { AssetsCdnProvider } from '@core/lib';
import { Language, LanguageUtil } from '@ts-core/language';
import { Client } from '@common/platform/api';
import { filter, map, merge, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import 'numeral/locales/ru';
import 'moment/locale/ru';

@Component({
    selector: 'root',
    templateUrl: 'root.component.html',
    styleUrl: 'root.component.scss',
    standalone: false
})
export class RootComponent extends ApplicationComponent<SettingsService> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public isLoading: boolean;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        @Inject(Logger) private logger: LoggerWrapper,
        private element: ElementRef,
        private transport: Transport,

        private api: Client,
        private login: LoginService,
        private router: RouterService,
        private windows: WindowService,

        protected theme: ThemeService,
        protected settings: SettingsService,
        protected language: LanguageService,

        public loading: LoadingService,
        icon: MatIconRegistry
    ) {
        super();
        icon.setDefaultFontSetClass('fas');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected initialize(): void {
        super.initialize();

        ViewUtil.addClasses(this.element, 'd-block h-100');

        this.initializeObservers();
        this.theme.loadIfExist(this.settings.theme);
        this.language.loadIfExist(this.settings.language);
        this.transport.level = this.logger.level = this.settings.isProduction ? LoggerLevel.LOG : LoggerLevel.LOG;
    }

    protected initializeAssets(): void {
        Assets.provider = new AssetsCdnProvider(this.settings.assetsUrl, this.settings.assetsCdnUrl);
    }

    private initializeObservers(): void {
        let manager = this.addDestroyable(new LoadingServiceManager(this.loading));
        manager.addLoadable(this.language, this.login, this.api, this.router);

        // Api
        merge(this.api.events)
            .pipe(
                filter(event => event.type === LoadableEvent.ERROR),
                map(<T>(event) => event.data as TransportHttpCommandAsync<T>),
                filter(command => command.isHandleError && !_.isNil(command.error)),
                takeUntil(this.destroyed)
            ).subscribe(data => this.apiLoadingError(data));

        // Login
        this.login.events.subscribe(data => {
            switch (data.type) {
                case LoginServiceBaseEvent.LOGIN_COMPLETE:
                    this.router.navigateIfNotLoading(LoginNotGuard.redirectUrl);
                    break;
                case LoginServiceBaseEvent.LOGOUT_FINISHED:
                    this.router.navigate(LoginGuard.redirectUrl);
                    break;
                case LoginServiceBaseEvent.LOGOUT_STARTED:
                    this.windows.closeAll();
                    break;
            }
        });
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async apiLoadingError<T>(command: TransportHttpCommandAsync<T>): Promise<void> {
        let error = command.error;
        let { key, params } = LanguageUtil.getErrorTranslation(error);

        let options = { id: `error.${error.code}` };
        if (this.isNeedLogout(error)) {
            await this.login.logout();
        }
        if (command.isHandleError) {
            this.windows.info(key, params, null, options);
        }
    }

    protected isNeedLogout(error: any): boolean {
        if (error.status === ExtendedError.HTTP_CODE_UNAUTHORIZED) {
            return true;
        }
        return false;
    }

    protected languageLoadingError(item: Language, error: Error): void {
        let message = `Unable to load language "${item.locale}"`;
        if (!_.isNil(error)) {
            message += `, error: ${error}`;
        }
        this.windows.info(message);
    }

    protected async readyHandler(): Promise<void> {
        await this.login.loginIfNeed();
    }
}

