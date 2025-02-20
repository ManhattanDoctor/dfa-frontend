import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterService, UserService } from '@core/service';
import { WindowService } from '@ts-core/angular';
import { Client } from '@common/platform/api';
import { User } from '@common/platform/user';
import { Resolver } from '@core/resolver';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserResolver extends Resolver<User> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(router: RouterService, windows: WindowService, private service: UserService, private api: Client) {
        super(windows, router);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        let { id } = route.params;
        try {
            return _.isNil(id) || this.service.isEquals(id) ? this.service.user : await this.api.userGet(id);
        } catch (error) {
            return this.parseError(error.toString(), false);
        }
    }
}