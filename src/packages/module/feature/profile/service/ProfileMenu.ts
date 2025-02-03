import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { WindowService, ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LoginService, UserService, EnvironmentService } from '@core/service';
import { Transport } from '@ts-core/common';
import { merge, takeUntil } from 'rxjs';
import { ProfileEditCommand } from '../transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ProfileMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static PROFILE = 20;
    private static LOGOUT = 1000;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        language: LanguageService,
        transport: Transport,
        windows: WindowService,
        user: UserService,
        login: LoginService,
        environment: EnvironmentService,
    ) {
        super(language, true);

        let item: IListItem = null;

        item = this.add(new ListItem('login.logout.logout', ProfileMenu.LOGOUT, null, 'fas fa-sign-out-alt me-2'));
        item.checkEnabled = () => !login.isLoading && environment.isSiteMode;
        item.action = () => windows.question('login.logout.confirmation').yesNotPromise.then(() => login.logout());

        item = this.add(new ListItem('profile.profile', ProfileMenu.PROFILE, null, 'fas fa fa-cog me-2'));
        item.action = () => transport.send(new ProfileEditCommand(user.id));

        merge(user.logined, user.logouted).pipe(takeUntil(this.destroyed)).subscribe(() => this.refresh());

        this.complete();
        this.refresh();
    }
}
