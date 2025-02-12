import { Injectable } from '@angular/core';
import { SettingsBaseService } from '@ts-core/frontend';
import { IHlfSettings } from '@common/platform/settings';
import * as _ from 'lodash';
import { IKeycloakSettings } from '@ts-core/openid-common';

@Injectable({ providedIn: 'root' })
export class SettingsService extends SettingsBaseService {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //  Public Properties
    //
    // --------------------------------------------------------------------------

    public get hlf(): IHlfSettings {
        return this.getValue('hlf');
    }

    public get keycloak(): IKeycloakSettings {
        return this.getValue('keycloak');
    }

    public get assetsCdnUrl(): string {
        return SettingsBaseService.parseUrl(this.getValue('assetsCdnUrl'));
    }

    public get isProduction(): boolean {
        return SettingsBaseService.parseBoolean(this.getValue('isProduction'));
    }
}