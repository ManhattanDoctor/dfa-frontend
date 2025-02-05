import { Destroyable, ExtendedError, UrlUtil } from '@ts-core/common';
import { LanguageService } from '@ts-core/frontend';
import { ILanguageLoader, LanguageDelegateLoader, LanguagePreloadLoader, LanguageFileLoader, LanguageProjects, ILanguageProjectSettings, LanguageUtil } from '@ts-core/language';
import { Client, CONFIG_URL } from '@common/platform/api';
import { PlatformService, RouterBaseService, WindowService } from '@ts-core/angular';
import { SettingsService, SocketService } from '../service';
import { IServerInitializeOptions } from './IServerInitializeOptions';
import axios from 'axios';
import * as _ from 'lodash';

export abstract class ApplicationInitializer extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        protected api: Client,
        protected socket: SocketService,
        protected router: RouterBaseService,
        protected settings: SettingsService,
        protected platform: PlatformService,
        protected language: LanguageService,
        protected options: IServerInitializeOptions,
        protected windows: WindowService,
    ) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async initialize(): Promise<void> {
        try {
            this.settings.initialize(await this.getConfig(), this.router.getParams());
        }
        catch (error: any) {
            this.windows.info(error.message, null, null, { isDisableClose: true, isModal: true });
            return;
        }
        this.api.url = this.socket.url = this.settings.apiUrl;
        this.language.loader = await this.getLanguageLoader();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async getLanguageLoader<T = any>(): Promise<ILanguageLoader<T>> {
        if (this.platform.isPlatformServer) {
            if (_.isNil(this.options)) {
                throw new ExtendedError(`Unable to initialize: options is nil`);
            }
            return new LanguagePreloadLoader(this.options.locales);
        }
        if (this.settings.isProduction) {
            return new LanguageDelegateLoader(locale => this.api.language(this.languageSettings.name, locale, this.settings.version));
        }
        return new LanguageFileLoader(`${this.settings.assetsUrl}language/`, this.languageSettings.prefixes);
    }

    protected async getConfig(): Promise<any> {
        if (this.platform.isPlatformServer) {
            if (_.isNil(this.options)) {
                throw new ExtendedError(`Unable to initialize: options is nil`);
            }
            return this.options.config;
        }
        let local = await axios.get('config.json');
        let remote = await axios.get(`${UrlUtil.parseUrl(local.data.apiUrl)}${CONFIG_URL}`);
        return Object.assign(local.data, remote.data);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected abstract get languageSettings(): ILanguageProjectSettings;
}
