import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { CookieService, JSONValueStorage, LocalStorageService, LoginBaseService, LoginTokenStorage as LoginTokenStorageBase } from '@ts-core/angular';
import { IInitDtoResponse, ILoginDto, ILoginDtoResponse, LoginResource } from '@common/platform/api/login';
import { ExtendedError, Transport, TransportNoConnectionError, TransportTimeoutError } from '@ts-core/common';
import { OAuthLoginCommand } from '@feature/oauth/transport';
import { IOpenIdToken } from '@ts-core/openid-common';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class LoginService extends LoginBaseService<void, ILoginDtoResponse, IInitDtoResponse> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public isNeedSaveToken: boolean = true;
    private storage: LoginTokenStorage;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport, private api: Client, storage: LocalStorageService, cookies: CookieService) {
        super();
        this.storage = new LoginTokenStorage(storage, cookies);
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
        this._sid = data.access_token;
        this.storage.set(this.isNeedSaveToken ? data : null);
    }

    protected loginSidRequest(): Promise<IInitDtoResponse> {
        this.api.sid = this.sid;
        return this.api.init();
    }

    protected async logoutRequest(): Promise<void> { }

    protected reset(): void {
        super.reset();
        this.storage.set(null);
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

    public isCanLoginWithSid(): boolean {
        return !_.isNil(this.sid) || !_.isNil(this.getSavedSid());
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected getSavedSid(): string {
        return this.storage.has() ? this.storage.get().access_token : null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get sid(): string {
        return this._sid;
    }
}

class LoginTokenStorage extends JSONValueStorage<IOpenIdToken> {
    constructor(storage: LocalStorageService, cookies: CookieService) {
        super(LoginTokenStorageBase.TOKEN_KEY, storage, cookies);
    }
}

