import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { takeUntil } from 'rxjs';
import { User } from '@core/lib/user';
import { ThemeAssetService } from '@ts-core/frontend';
import { UserService, PipeService, LoginService } from '@core/service';
import { ProfileMenu } from '../../service';
import { merge } from 'rxjs';
import * as _ from 'lodash';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'profile-info',
    templateUrl: 'profile-info.component.html',
    styleUrls: ['profile-info.component.scss'],
    standalone: false
})
export class ProfileInfoComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    /*
    @ViewChild('userContainer', { static: true })
    public userContainer: UserContainerComponent;
    */
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
        public menu: ProfileMenu,
        public login: LoginService,
        private pipe: PipeService,
        private service: UserService,
        private themeAsset: ThemeAssetService
    ) {
        super();
        ViewUtil.addClasses(container, 'd-flex align-items-center mouse-active background-color-hover');

        this.checkUser();
        merge(service.logined, service.logouted, service.changed, pipe.language.completed)
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

    private getDefaultUser(): User {
        /*
        let item = new User();
        item.account = new UserAccount();
        item.statistics = new UserStatistics();

        item.preferences = new UserPreferences();
        item.preferences.name = this.pipe.language.translate('login.isNotLoggedIn.isNotLoggedIn');
        item.preferences.picture = this.themeAsset.getIcon('64');
        return item;
        */
       return null;
    }

    private checkUser = (): void => {
        this.user = this.service.isLogined ? this.service.user : this.getDefaultUser();
        /*
        if (!_.isNil(this.userContainer)) {
            this.userContainer.invalidateUser();
        }
            */
    }

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    public clickHandler(): void {
        this.menu.refresh();
        if (this.menu.filtered.length != 1) {
            return;
        }
        let item = this.menu.filtered[0];
        item.action(item);
        this.menuTrigger.closeMenu();
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
