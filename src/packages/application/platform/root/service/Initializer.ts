import { Inject, Injectable, Optional } from '@angular/core';
import { IServerInitializeOptions, ApplicationInitializer, SERVER_INITIALIZE_OPTIONS } from '@core/lib';
import { Client } from '@common/platform/api';
import { SettingsService, SocketService } from '@core/service';
import { NotificationService, PlatformService, RouterBaseService, WindowService } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { LanguageProjects } from '@common/platform/language';
import { ILanguageProjectSettings } from '@ts-core/language';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class Initializer extends ApplicationInitializer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        api: Client,
        socket: SocketService,
        settings: SettingsService,
        platform: PlatformService,
        language: LanguageService,
        router: RouterBaseService,
        @Optional() @Inject(SERVER_INITIALIZE_OPTIONS) options: IServerInitializeOptions,
        windows: WindowService,

        notifications: NotificationService,
    ) {
        super(api, socket, router, settings, platform, language, options, windows);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get languageSettings(): ILanguageProjectSettings {
        return LanguageProjects[0];
    }
}
