import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { User } from '@core/lib/user';
import { LanguageService } from '@ts-core/frontend';
import { UserService, LoginService } from '@core/service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { UserContainerComponent } from '@shared/component';
import { VIMatModule } from '@ts-core/angular-material';
import { merge, takeUntil } from 'rxjs';
import { ProfileMenu } from '@shared/service';
import * as _ from 'lodash';

@Component({
    imports: [
        MatMenuModule,
        VIMatModule,

        UserContainerComponent
    ],
    selector: 'user-info',
    templateUrl: 'user-info.component.html'
})
export class UserInfoComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild('userContainer', { static: true })
    public userContainer: UserContainerComponent;

    @ViewChild('menuTrigger', { static: true })
    public menuTrigger: MatMenuTrigger;

    private _user: User;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        language: LanguageService,
        public menu: ProfileMenu,
        public login: LoginService,
        public service: UserService,
    ) {
        super();
        ViewUtil.addClasses(container, 'd-flex align-items-center mouse-active background-color-hover');

        this.checkUser();
        merge(service.logined, service.logouted, service.changed, language.completed)
            .pipe(takeUntil(this.destroyed))
            .subscribe(this.checkUser);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitUserProperties(): void {
        let value = null;
    }

    private checkUser = (): void => {
        this.user = this.service.user;
        if (!_.isNil(this.userContainer)) {
            this.userContainer.user = this.user;
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    public clickHandler(): void {
        this.menu.refresh();
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get user(): User {
        return this._user
    }
    public set user(value: User) {
        if (value === this._user) {
            return;
        }
        this._user = value;
        if (!_.isNil(value)) {
            this.commitUserProperties();
        }
    }
}
