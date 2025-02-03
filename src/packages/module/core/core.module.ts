//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { APP_INITIALIZER, ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import {
    LoginBaseService,
    RouterBaseService,
    ITransportLazyModuleData,
    TransportLazy,
    LazyModuleLoader,
    PipeBaseService,
    LoginGuard,
    MomentDatePipe,
    ILazyModuleData,
} from '@ts-core/angular';
import { VIMatModule } from '@ts-core/angular-material';
import { SettingsBaseService } from '@ts-core/frontend';
import { CoreInitializer, LoginService, PipeService, SocketService, RouterService, SettingsService } from './service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ILogger, Logger, LoggerLevel } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { Transport } from '@ts-core/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { DateUtil } from '@ts-core/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TransportSocket } from '@ts-core/socket-client';
import * as _ from 'lodash';

//--------------------------------------------------------------------------
//
// 	Module
//
//--------------------------------------------------------------------------

@NgModule({
    imports: [
        VIMatModule.forRoot({ languageOptions: { name: 'platform-language' }, themeOptions: { name: 'platform-theme' } }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false, registrationStrategy: 'registerWhenStable:30000' }),

        // Have to import it here, even if it's not using in the core
        MatDatepickerModule,
        MatMomentDateModule,
        MatAutocompleteModule,
    ]
})
export class CoreModule {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static forRoot(settings: ICoreModuleSettings): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    deps: [CoreInitializer],
                    useFactory: (item: CoreInitializer) => () => item.initialize(),
                    multi: true
                },
                {
                    provide: Client,
                    deps: [Logger],
                    useFactory: (logger: ILogger): Client => new Client(logger, null, LoggerLevel.NONE)
                },
                {
                    provide: Transport,
                    deps: [Logger, LazyModuleLoader, PLATFORM_ID],
                    useFactory: (logger: ILogger, loader: LazyModuleLoader<ITransportLazyModuleData>): Transport => {
                        let item = new TransportLazy(logger, loader, { timeout: DateUtil.MILLISECONDS_DAY });
                        loader.modules.addItems(settings.modules);
                        return item;
                    }
                },
                { provide: TransportSocket, useExisting: SocketService },

                { provide: MomentDatePipe, useClass: MomentDatePipe, },
                { provide: PipeBaseService, useExisting: PipeService, },
                { provide: LoginBaseService, useExisting: LoginService },
                { provide: RouterBaseService, useExisting: RouterService },
                { provide: SettingsBaseService, useExisting: SettingsService },
                

                { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { float: 'auto', appearance: 'outline' } },
                {
                    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
                    useValue: {
                        showDelay: DateUtil.MILLISECONDS_SECOND / 2,
                        hideDelay: DateUtil.MILLISECONDS_SECOND / 4,
                        touchendHideDelay: DateUtil.MILLISECONDS_SECOND / 4,
                        disableTooltipInteractivity: true,
                        touchGestures: 'auto'
                    }
                },
                { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
                {
                    provide: MAT_DATE_FORMATS,
                    useValue: {
                        parse: { dateInput: 'LLL' },
                        display: {
                            dateInput: 'LL',
                            monthYearLabel: 'MMM YYYY',
                            dateA11yLabel: 'LL',
                            monthYearA11yLabel: 'MMMM YYYY'
                        }
                    }
                }
            ]
        };
    }
}

export interface ICoreModuleSettings {
    modules: Array<ILazyModuleData>;
}
