import { Injectable } from "@angular/core";
import { CookieService, JSONValueStorage, LocalStorageService, LoginTokenStorage } from "@ts-core/angular";
import { IOpenIdTokenRefreshable, KeycloakTokenManager } from "@ts-core/openid-common";
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class OpenIdTokenService extends KeycloakTokenManager {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private storage: JSONValueStorage<IOpenIdTokenRefreshable>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(storage: LocalStorageService, cookies: CookieService) {
        super();
        this.storage = new OpenIdTokenStorage(storage, cookies);
        this.value = this.storage.get();
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitValueProperties(): void {
        super.commitValueProperties();
        if (!_.isNil(this.storage)) {
            this.storage.set(this.value);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    
    public destroy(): void {
        super.destroy();
        this.storage = null;
    }
}

class OpenIdTokenStorage extends JSONValueStorage<IOpenIdTokenRefreshable> {
    constructor(storage: LocalStorageService, cookies: CookieService) {
        super(LoginTokenStorage.TOKEN_KEY, storage, cookies);
    }
}