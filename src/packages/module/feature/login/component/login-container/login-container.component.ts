import { Component, ViewContainerRef } from '@angular/core';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { LoginService } from '@core/service';
import { ISerializable, Transport } from '@ts-core/common';
import { takeUntil } from 'rxjs';
import { OAuthLoginCommand } from '@feature/oauth/transport';
import { PopUpBase } from '@ts-core/oauth';
import { LoginResource } from '@common/platform/api/login';
import * as _ from 'lodash';

@Component({
    selector: 'login-container',
    templateUrl: 'login-container.component.html',
    standalone: false
})
export class LoginContainerComponent extends IWindowContent implements ISerializable<boolean> {
    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ViewContainerRef, private transport: Transport, public service: LoginService, private windows: WindowService) {
        super(element);
        ViewUtil.addClasses(element.element, 'd-block');

        this.isDisabled = service.isLoading;
        service.logined.pipe(takeUntil(this.destroyed)).subscribe(() => this.close());
        service.started.pipe(takeUntil(this.destroyed)).subscribe(() => (this.isDisabled = true));
        service.finished.pipe(takeUntil(this.destroyed)).subscribe(() => (this.isDisabled = false));
    }

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    private async loginOAuth(resource: LoginResource): Promise<void> {
        try {
            let data = await this.transport.sendListen(new OAuthLoginCommand(resource));
            if (!_.isNil(data)) {
                this.service.login({ resource, data });
            }
        } catch (error: any) {
            if (!PopUpBase.isWindowClosedError(error)) {
                this.windows.info(error.message);
            }
            this.shake();
        }
    }
    

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async keycloak(): Promise<void> {
        return this.loginOAuth(LoginResource.KEYCLOAK);
    }

    public serialize(): boolean {
        return this.service.isLoggedIn;
    }
}
