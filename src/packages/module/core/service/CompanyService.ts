import { Injectable } from '@angular/core';
import { Loginable } from '@ts-core/angular';
import { Company } from '@common/platform/company';
import { ObjectUtil, ObservableData, TransformUtil, Transport } from '@ts-core/common';
import { filter, map, Observable, takeUntil } from 'rxjs';
import { LoginService } from './LoginService';
import { SocketService } from './SocketService';
import { CompanyAddedEvent, CompanyChangedEvent } from '@common/platform/transport';
import { PermissionService } from './PermissionService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyService extends Loginable<LoginService, CompanyServiceEvent, Company | Partial<Company>> {
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

    constructor(transport: Transport, login: LoginService, socket: SocketService, private permission: PermissionService) {
        super(login);
        this.initialize();

        socket.getDispatcher<CompanyChangedEvent>(CompanyChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                filter(item => this.has && item.id === this.company.id),
                takeUntil(this.destroyed)
            ).subscribe(item => this.update(item));

        socket.getDispatcher<CompanyAddedEvent>(CompanyAddedEvent.NAME)
            .pipe(
                map(item => item.data),
                takeUntil(this.destroyed)
            ).subscribe(async item => {
                this.set(TransformUtil.toClass(Company, item));
            });
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected set(item: Company): void {
        this._company = item;
        this.observer.next(new ObservableData(CompanyServiceEvent.CHANGED, this.company));
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async loginedHandler(): Promise<void> {
        this.set(this.login.loginData.company);
    }

    protected async logoutedHandler(): Promise<void> {
        this.set(null);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async update(data: any): Promise<void> {
        if (!this.has) {
            return;
        }
        let isNeedUpdatePermission = false;
        if (ObjectUtil.hasOwnProperty(data, 'status') && data.status !== this.company.status) {
            isNeedUpdatePermission = true;
        }
        Object.assign(this.company, data);
        this.observer.next(new ObservableData(CompanyServiceEvent.CHANGED, data));

        if (isNeedUpdatePermission) {
            await this.permission.refresh();
        }
    }

    public isEquals(item: Partial<Company> | number): boolean {
        if (!this.has || _.isNil(item)) {
            return false;
        }
        return _.isNumber(item) ? item === this.company.id : item.id === this.company.id;
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

    public get changed(): Observable<Partial<Company>> {
        return this.events.pipe(
            filter(item => item.type === CompanyServiceEvent.CHANGED),
            map(item => item.data as Partial<Company>)
        );
    }
}

export enum CompanyServiceEvent {
    CHANGED = 'CHANGED'
}

