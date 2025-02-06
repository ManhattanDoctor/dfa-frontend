import { Injectable } from '@angular/core';
import { DestroyableContainer, Logger } from '@ts-core/common';
import { SettingsService, EnvironmentService } from '@core/service';
import { OAuthCordovaInAppBrowserPluginPropertiesSet, GoAuth, MaAuth, OAuthBase, VkAuth, YaAuth, KeycloakAuth } from '@ts-core/oauth';
import { NativeWindowService } from '@ts-core/frontend';
import { LoginResource } from '@common/platform/api/login';
import { Client } from '@common/platform/api';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class OAuthService extends DestroyableContainer {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private map: Map<LoginResource, OAuthBase>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private logger: Logger, private nativeWindow: NativeWindowService, private settings: SettingsService, private environment: EnvironmentService, private api: Client) {
        super();
        this.map = new Map();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public getAuth(resource: LoginResource, scope?: string): OAuthBase {
        if (this.map.has(resource)) {
            return this.map.get(resource);
        }
        let item: OAuthBase = null;
        let window = this.nativeWindow.window;
        switch (resource) {
            case LoginResource.KEYCLOAK:
                item = new KeycloakAuth(this.logger, this.settings.keycloak, window);
                if (_.isNil(scope)) {
                    scope = 'openid profile';
                }
                item.params.set('scope', scope);
                item.params.set('prompt', 'consent');
                break;
        }
        this.map.set(resource, item);
        return item;
    }
}

