import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompanyService, RouterService } from '@core/service';
import { WindowService } from '@ts-core/angular';
import { Client } from '@common/platform/api';
import { Company } from '@common/platform/company';
import { Resolver } from '@core/resolver';
import { CompanyUndefinedError } from '@common/platform';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyResolver extends Resolver<Company> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(router: RouterService, windows: WindowService, private service: CompanyService, private api: Client) {
        super(windows, router);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Company> {
        let { id } = route.params;
        try {
            if (_.isNil(id)) {
                if (this.service.has) {
                    return this.service.company;
                }
                else {
                    throw new CompanyUndefinedError();
                }
            }
            return await this.api.companyGet(id);
        } catch (error) {
            return this.parseError(error.toString(), true);
        }
    }
}