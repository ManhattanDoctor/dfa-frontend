import { ListItem, ListItems, IListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { PipeService, RouterService, UserService } from '@core/service';
import { User } from '@core/lib/user';
import { Transport } from '@ts-core/common';
import * as _ from 'lodash';
import { PermissionUtil } from '@common/util';

@Injectable({ providedIn: 'root' })
export class UserMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static OPEN = 0;
    private static PREFERENCES = 10;
    private static COIN_TRANSACTION = 20;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, private transport: Transport, private pipe: PipeService, private router: RouterService, private service: UserService) {
        super(language);

        let item: IListItem<void> = null;

        /*
        item = this.add(new MenuItem('user.user', UserMenu.OPEN, 'fa fa-user me-2'));
        item.action = (item, user) => transport.send(new UserOpenCommand({ uid: user.id, isBriefly: false }));
        item.checkEnabled = (item, user) => !this.isUserPage(user);

        item = this.add(new ListItem('coin.balance', UserMenu.COIN_TRANSACTION, null, 'fas fa fa-coins me-2'));
        item.action = (item, user) => transport.send(new CoinBalanceEditOpenCommand(user.preferences.uid));
        item.checkEnabled = (item, user) => PermissionUtil.userIsAdministrator(service.user);

        item = this.add(new MenuItem('user.preferences.preferences', UserMenu.PREFERENCES, 'fas fa fa-cog me-2'));
        item.checkEnabled = (item, user) => service.isUser(user) || PermissionUtil.userIsAdministrator(service.user);
        item.action = (item, user) => transport.send(new ProfileEditCommand(user.id));
        */
        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isUserPage(user: User): boolean {
        let url = this.service.isUser(user) ? RouterService.PROFILE_URL : `${RouterService.USER_URL}/${user.id}`
        return this.router.isUrlActive(url, false);
    }
}

class MenuItem extends ListItem<void> {
    declare action: (item: ListItem, user: User) => void;
    declare checkEnabled: (item: ListItem, user: User) => boolean;
    constructor(translationId: string, sortIndex: number, iconId: string) {
        super(translationId, sortIndex);
        this.iconId = iconId;
    }
}
