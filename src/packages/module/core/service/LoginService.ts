import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { LoginServiceBase } from '@ts-core/angular';
import { IInitDtoResponse, ILoginDto, ILoginDtoResponse, LoginResource } from '@common/platform/api/login';
import { ExtendedError, Transport, TransportNoConnectionError, TransportTimeoutError } from '@ts-core/common';
import { OAuthLoginCommand } from '@feature/oauth/transport';
import { KeycloakTokenManager } from '@ts-core/openid-common';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class LoginService extends LoginServiceBase<void, ILoginDtoResponse, IInitDtoResponse> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport, private api: Client, private token: KeycloakTokenManager) {
        super();
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
        this.token.value = data;
    }

    protected loginSidRequest(): Promise<IInitDtoResponse> {
        return this.api.init();
    }

    protected async logoutRequest(): Promise<void> {
        if (this.token.isValid) {
            await this.api.logout(this.token.refresh.value);
        }
    }

    protected getSavedSid(): string {
        return this.token.isValid ? this.token.access.value : null;
    }

    protected reset(): void {
        super.reset();
        this.token.value = null;
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

    public get sid(): string {
        return this.token.isValid ? this.token.access.value : null;
    }
}
