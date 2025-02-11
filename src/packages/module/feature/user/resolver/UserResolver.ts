import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { RouterService } from '@core/service';
import { WindowService } from '@ts-core/angular';
import { Client } from '@common/api';
import { User } from '@common/user';
import { Resolver } from '@core/resolver';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserResolver extends Resolver<User> {
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

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        let uid = route.params.uid;
        if (_.isNil(uid)) {
            return this.parseError('error.userUidNotFound', true);
        }
        try {
            return await this.api.userGet(uid);
        } catch (error) {
            return this.parseError(error.toString(), false);
        }
    }
}