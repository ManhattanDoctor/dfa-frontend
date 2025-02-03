import { ApplicationRef, Injectable, Injector, NgModule } from '@angular/core';
import { APPLICATION_INJECTOR, ITransportLazyModuleData, LazyModuleLoader } from '@ts-core/angular';
import { RootModule } from './root.module';
import { RootComponent } from './component/root.component';

//--------------------------------------------------------------------------
//
// 	Requires browser only
//
//--------------------------------------------------------------------------

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

@Injectable()
class HammerConfig extends HammerGestureConfig {
    overrides = <any>{
        swipe: { direction: Hammer.DIRECTION_ALL, enable: true },
        pinch: { enable: false },
        rotate: { enable: false }
    }
}
//--------------------------------------------------------------------------
//
// 	Module
//
//--------------------------------------------------------------------------

@NgModule({
    imports: [
        RootModule,
        // Requires browser only
        // MetrikaModule.forRoot({ id: 89206195, webvisor: false, clickmap: true, trackLinks: true, accurateTrackBounce: true, }),

        HammerModule,
        BrowserModule,
        BrowserAnimationsModule,

    ],
    providers: [
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
    ]

})
export class RootBrowserModule {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private injector: Injector, loader: LazyModuleLoader<ITransportLazyModuleData>) { }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public ngDoBootstrap(applicationRef: ApplicationRef): void {
        APPLICATION_INJECTOR(this.injector);
        applicationRef.bootstrap(RootComponent);
    }
}
