import { Injectable } from '@angular/core';
import { Transport, Destroyable } from '@ts-core/common';
import { ThemeService } from '@ts-core/frontend';
import { SeoService } from './SeoService';
import { ServiceWorkerService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoreInitializer extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        seo: SeoService,
        theme: ThemeService,
        transport: Transport,
        serviceWorker: ServiceWorkerService
    ) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async initialize(): Promise<void> { }
}
