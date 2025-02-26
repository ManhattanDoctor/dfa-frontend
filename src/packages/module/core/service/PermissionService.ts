import { Injectable } from '@angular/core';
import { OpenIdResources } from '@ts-core/openid-common';
import { ExtendedError, Loadable, LoadableEvent, LoadableStatus, ObservableData } from '@ts-core/common';
import { OpenIdTokenService } from './OpenIdTokenService';
import { takeUntil } from 'rxjs';
import { Client } from '@common/platform/api';
import { LoadableResolver } from '@ts-core/angular';
import { ResourcePermission } from '@common/platform';
import * as _ from 'lodash';
import { PermissionUtil } from '../../../../externals/common/platform/util';

@Injectable({ providedIn: 'root' })
export class PermissionService extends Loadable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _resources: OpenIdResources;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private api: Client, private token: OpenIdTokenService) {
        super();
        token.changed.pipe(takeUntil(this.destroyed)).subscribe(() => this.updateIfNeed());
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected async update(): Promise<void> {
        if (this.isLoading) {
            return;
        }

        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED));

        try {
            this._resources = await this.resourcesGet();
            this.status = LoadableStatus.LOADED;
            this.observer.next(new ObservableData(LoadableEvent.COMPLETE));
        }
        catch (error) {
            this.status = LoadableStatus.ERROR;
            this.observer.next(new ObservableData(LoadableEvent.ERROR, null, ExtendedError.create(error)));
        }
        finally {
            this.observer.next(new ObservableData(LoadableEvent.FINISHED));
        }
    }

    protected commitStatusChangedProperties(oldStatus: LoadableStatus, newStatus: LoadableStatus): void {
        switch (newStatus) {
            case LoadableStatus.ERROR:
            case LoadableStatus.NOT_LOADED:
                this._resources = null;
                break;
        }
    }

    protected async resourcesGet(): Promise<OpenIdResources> {
        return this.api.openIdResourcesGet(this.token.access.value);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async updateIfNeed(): Promise<void> {
        if (!this.token.isExpired) {
            await this.update();
        }
        else {
            this.status = LoadableStatus.NOT_LOADED;
        }
    }

    public validate(permission: ResourcePermission, isThrowError: boolean): boolean {
        return PermissionUtil.validatePermission({ resources: this.resources, permission }, isThrowError);
    }

    public async refresh(): Promise<boolean> {
        return this.api.refresh(true);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get resources(): OpenIdResources {
        return this._resources;
    }
}


@Injectable({ providedIn: 'root' })
export class PermissionResolver extends LoadableResolver<PermissionService> {
    constructor(service: PermissionService) {
        super(service);
    }
}
