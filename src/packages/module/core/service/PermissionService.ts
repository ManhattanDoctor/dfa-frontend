import { Injectable } from '@angular/core';
import { IKeycloakSettings, KeycloakClient, OpenIdResources } from '@ts-core/openid-common';
import { ExtendedError, Loadable, LoadableEvent, LoadableStatus, ObservableData } from '@ts-core/common';
import { OpenIdTokenService } from './OpenIdTokenService';
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
    protected _resources: OpenIdResources;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private token: OpenIdTokenService) {
        super();
        token.changed.pipe(takeUntil(this.destroyed)).subscribe(() => this.update());
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async update(): Promise<void> {
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
        return new KeycloakClient(this.token.access.value, this.settings).getResources();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get resources(): OpenIdResources {
        return this._resources;
    }
    public get settings(): IKeycloakSettings {
        return this._settings;
    }
    public set settings(value: IKeycloakSettings) {
        if (value === this._settings) {
            return;
        }
        this._settings = value;
        this.update();
    }
}
