import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil, ThemeAssetBackgroundDirective } from '@ts-core/angular';
import { User } from '@common/platform/user';
import { ThemeAssetService, ThemeService } from '@ts-core/frontend';
import { EnvironmentService, PipeService, UserService } from '@core/service';
import * as _ from 'lodash';
import { DestroyableContainer } from '@ts-core/common';
import { UserMenu } from '@feature/user/service';

@Component({
    selector: 'user-card-header',
    templateUrl: 'user-card-header.component.html',
    standalone: false
})
export class UserCardHeaderComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _user: User;
    public isUser: boolean;
    public description: string;

    @Input()
    public isHideMenu: boolean;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        private container: ViewContainerRef,
        private pipe: PipeService,
        private service: UserService,
        public menu: UserMenu,
        public environment: EnvironmentService
    ) {
        super();
        ViewUtil.addClasses(container, 'd-flex justify-content-center align-items-center flex-shrink-0 px-4 pt-4 position-relative border-bottom');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitUserProperties(): void {
        let value = null;

        value = this.service.isUser(this.user);
        if (value !== this.isUser) {
            this.isUser = value;
        }

        value = this.getDescription();
        if (value !== this.description) {
            this.description = value;
        }

        ViewUtil.toggleClass(this.container, 'pb-4', this.isUser);
        ViewUtil.toggleClass(this.container, 'pb-5', !this.isUser);
    }

    private getDescription(): string {
        return this.pipe.userDescription.transform(this.user);
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get user(): User {
        return this._user;
    }
    @Input()
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
