import { Injectable } from '@angular/core';
import { IKeycloakSettings, KeycloakClient, KeycloakResources, KeycloakTokenManager, KeycloakUtil } from '@ts-core/openid-common';
import { getResourceValidationOptions } from '@common/platform';
import { ExtendedError, Loadable, LoadableEvent, LoadableStatus, ObservableData } from '@ts-core/common';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class PermissionService extends Loadable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _settings: IKeycloakSettings;
    protected resources: KeycloakResources;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private token: KeycloakTokenManager) {
        super();
        this.resourcesUpdate();
        token.changed.pipe(takeUntil(this.destroyed)).subscribe(() => this.resourcesUpdate());
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected commitStatusChangedProperties(oldStatus: LoadableStatus, newStatus: LoadableStatus): void {
        switch (newStatus) {
            case LoadableStatus.ERROR:
            case LoadableStatus.NOT_LOADED:
                this.resources = null;
                break;
        }
    }

    protected commitSettingsProperties(): void {
        this.resourcesUpdate();
    }

    protected async resourcesUpdate(): Promise<void> {
        if (!this.token.isValid || _.isNil(this.settings)) {
            this.status = LoadableStatus.NOT_LOADED;
            return;
        }

        if (this.isLoading) {
            return;
        }

        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED));

        try {
            this.resources = await this.resourcesGet();
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

    protected resourcesGet(): Promise<KeycloakResources> {
        return new KeycloakClient(this.token.access.value, this.settings).getResources();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public hasResourceScope(permission: string): boolean {
        if (!this.isLoaded) {
            return false;
        }
        try {
            KeycloakUtil.validateResourceScope(getResourceValidationOptions(permission), this.resources);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get settings(): IKeycloakSettings {
        return this._settings;
    }
    public set settings(value: IKeycloakSettings) {
        if (value === this._settings) {
            return;
        }
        this._settings = value;
        if (!_.isNil(value)) {
            this.commitSettingsProperties();
        }
    }
}
