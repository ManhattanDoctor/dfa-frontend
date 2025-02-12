import { Injectable } from '@angular/core';
import { Loginable } from '@ts-core/angular';
import { Company } from '@common/platform/company';
import { ObservableData } from '@ts-core/common';
import { filter, map, Observable } from 'rxjs';
import { LoginService } from './LoginService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyService extends Loginable<LoginService,CompanyServiceEvent,Company>  {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _company: Company;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(login: LoginService) {
        super(login);
        this.initialize();
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async loginedHandler(): Promise<void> {
        this._company = this.login.loginData.company;
    }

    protected async logoutedHandler(): Promise<void> {
        this._company = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public update(data: any): void {
        if (!this.has) {
            return;
        }
        Object.assign(this.company, data);
        this.observer.next(new ObservableData(CompanyServiceEvent.CHANGED, this.company));
    }

    public isCompany(item: Partial<Company> | number): boolean {
        if (!this.has || _.isNil(item)) {
            return false;
        }
        if (_.isNumber(item)) {
            return item === this.company.id;
        }
        return item.id === this.company.id;
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        if (!_.isNil(this.observer)) {
            this.observer.complete();
            this.observer = null;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): number {
        return this.has ? this.company.id : null;
    }

    public get has(): boolean {
        return !_.isNil(this.company);
    }

    public get company(): Company {
        return this._company;
    }

    public get changed(): Observable<Company> {
        return this.events.pipe(
            filter(item => item.type === CompanyServiceEvent.CHANGED),
            map(item => item.data as Company)
        );
    }
}

export enum CompanyServiceEvent {
    CHANGED = 'CHANGED'
}

