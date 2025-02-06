import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { CookieService, JSONValueStorage, LocalStorageService, LoginBaseService, LoginTokenStorage, ValueStorage } from '@ts-core/angular';
import { IInitDtoResponse, ILoginDto, ILoginDtoResponse, LoginResource } from '@common/platform/api/login';
import { DateUtil, ExtendedError, Transport, TransportNoConnectionError, TransportTimeoutError } from '@ts-core/common';
import { OAuthLoginCommand } from '@feature/oauth/transport';
import { IOpenIdToken, KeycloakTokenManager } from '@ts-core/openid-common';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class LoginService extends LoginBaseService<void, ILoginDtoResponse, IInitDtoResponse> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private manager: OpenIdTokenManager;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport, private api: Client, storage: LocalStorageService, cookies: CookieService) {
        super();
        this.manager = api.token = new OpenIdTokenManager(new OpenIdTokenStorage(storage, cookies));
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected loginRequest(data: ILoginDto): Promise<ILoginDtoResponse> {
        return this.api.login(data);
    }

    protected parseLoginResponse(data: ILoginDtoResponse): void {
        this.manager.value = data;
    }

    protected loginSidRequest(): Promise<IInitDtoResponse> {
        return this.api.init();
    }

    protected async logoutRequest(): Promise<void> { }

    protected reset(): void {
        super.reset();
        this.manager.value = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected parseLoginSidErrorResponse(error: ExtendedError): void {
        if (error instanceof TransportTimeoutError || error instanceof TransportNoConnectionError) {
            return;
        }
        this.reset();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public login(param: ILoginDto): Promise<ILoginDtoResponse> {
        return super.loginByParam(param);
    }

    public async loginOAuth(resource: LoginResource): Promise<void> {
        let data = await this.transport.sendListen(new OAuthLoginCommand(resource));
        if (!_.isNil(data)) {
            this.login({ resource, data });
        }
    }

    public async loginIfNeed(): Promise<boolean> {
        if (this.isLoggedIn) {
            return false;
        }
        return this.isCanLoginWithSid() ? this.loginBySidIfCan() : false;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected getSavedSid(): string {
        return this.manager.sid;
    }

    public get sid(): string {
        return this.manager.sid;
    }
}

class OpenIdTokenStorage extends JSONValueStorage<IOpenIdToken> {
    constructor(storage: LocalStorageService, cookies: CookieService) {
        super(LoginTokenStorage.TOKEN_KEY, storage, cookies);
    }
}

class OpenIdTokenManager extends KeycloakTokenManager {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private storage: ValueStorage<IOpenIdToken>) {
        super(storage.get());
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

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get sid(): string {
        return this.isValid ? this.access.value : null;
    }
}