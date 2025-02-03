import { Injectable } from '@angular/core';
import { Client } from '@common/platform/api';
import { LoginBaseService, LoginTokenStorage } from '@ts-core/angular';
import { IInitDtoResponse, ILoginDto, ILoginDtoResponse, LoginResource } from '@common/platform/api/login';
import { ExtendedError, Transport, TransportNoConnectionError, TransportTimeoutError } from '@ts-core/common';
import { OAuthLoginCommand } from '@feature/oauth/transport';
import { EnvironmentService } from './EnvironmentService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class LoginService extends LoginBaseService<void, ILoginDtoResponse, IInitDtoResponse> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public isNeedSaveSid: boolean = true;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport, private storage: LoginTokenStorage, private api: Client, private environment: EnvironmentService) {
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
        this._sid = data.access.token;
        this.storage.set(this.isNeedSaveSid ? this.sid : null);
    }

    protected loginSidRequest(): Promise<IInitDtoResponse> {
        this.api.sid = this.sid;
        return this.api.init();
    }

    protected async logoutRequest(): Promise<void> {
        return this.api.logout();
    }

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
        return this.storage.get();
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

