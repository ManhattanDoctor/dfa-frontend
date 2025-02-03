import { Injectable } from '@angular/core';
import { CookieService } from '@ts-core/angular';
import { SettingsBaseService } from '@ts-core/frontend';
import { IKeycloakAuthSettings } from '@ts-core/oauth';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class SettingsService extends SettingsBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private cookies: CookieService) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //  Public Properties
    //
    // --------------------------------------------------------------------------

    public get isProduction(): boolean {
        return SettingsBaseService.parseBoolean(this.getValue('isProduction'));
    }

    public get assetsCdnUrl(): string {
        return SettingsBaseService.parseUrl(this.getValue('assetsCdnUrl'));
    }

    public get keycloak(): IKeycloakAuthSettings {
        return this.getValue('keycloak');
    }
}

