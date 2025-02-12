import { Injectable } from '@angular/core';
import { IKeycloakSettings, KeycloakClient } from '@ts-core/openid-common';
import { Resource, ResourceScope } from '@common/platform';
import { OpenIdTokenService } from './OpenIdTokenService';
import { Destroyable } from '@ts-core/common';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class PermissionService extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _settings: IKeycloakSettings;
    private _permissions: Map<Resource, Array<ResourceScope>>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private token: OpenIdTokenService) {
        super();
        this._permissions = new Map();

        this.check();
        token.changed.pipe(takeUntil(this.destroyed)).subscribe(this.check);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private check = async (): Promise<void> => {
        this.permissions.clear();
        if (!this.token.isValid || _.isNil(this.settings)) {
            return;
        }
        for (let item of await new KeycloakClient(this.token.access.value, this.settings).getResources()) {
            this.permissions.set(item.rsname as Resource, item.scopes as Array<ResourceScope>);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    public get permissions(): Map<Resource, Array<ResourceScope>> {
        return this._permissions;
    }
    public get settings(): IKeycloakSettings {
        return this._settings;
    }
    public set settings(value: IKeycloakSettings) {
        if (value === this._settings) {
            return;
        }
        this._settings = value;
        this.check();
    }
}