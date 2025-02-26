import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterService } from '@core/service';
import { WindowService } from '@ts-core/angular';
import { Client } from '@common/platform/api';
import { Coin } from '@common/platform/coin';
import { Resolver } from '@core/resolver';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinResolver extends Resolver<Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(router: RouterService, windows: WindowService, private api: Client) {
        super(windows, router);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Coin> {
        let { id } = route.params;
        try {
            return await this.api.coinGet(id);
        } catch (error) {
            return this.parseError(error.toString(), true);
        }
    }
}