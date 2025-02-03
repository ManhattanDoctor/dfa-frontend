import { Injectable } from '@angular/core';
import { Transport, Destroyable } from '@ts-core/common';
import { EnvironmentService } from './EnvironmentService';
import { RouterService } from './RouterService';
import { StorageService } from './StorageService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ActionService extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        private transport: Transport,
        private router: RouterService,
        private environment: EnvironmentService,
        private storage: StorageService,) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async check(): Promise<void> {

    }
}

