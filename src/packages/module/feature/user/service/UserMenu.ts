import { ListItem, ListItems, IListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { PermissionService, PipeService, RouterService, UserService } from '@core/service';
import { User } from '@core/lib/user';
import { Transport } from '@ts-core/common';
import { UserEditCommand, UserOpenCommand } from '../transport';
import { ResourcePermission } from '@common/platform';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserMenu extends ListItems<IListItem> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static OPEN = 0;
    private static EDIT = 10;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, private router: RouterService, private service: UserService, private permission: PermissionService) {
        super(language);

        let item: IListItem = null;

        item = this.add(new MenuItem('user.user', UserMenu.OPEN, 'fa fa-user me-2'));
        item.action = (item, user) => transport.send(new UserOpenCommand({ id: user.id, isBriefly: false }));
        item.checkEnabled = (item, user) => !this.isPageOpen(user.id) && permission.hasResourceScope(ResourcePermission.USER_READ);

        item = this.add(new MenuItem('general.edit.edit', UserMenu.EDIT, 'fa fa-pen me-2'));
        item.action = (item, user) => transport.send(new UserEditCommand(user.id));
        item.checkEnabled = (item, user) => this.service.isUser(user) || permission.hasResourceScope(ResourcePermission.USER_EDIT);

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isPageOpen(item: string): boolean {
        let items = [RouterService.USER_URL];
        if (this.service.isUser(item)) {
            items.push(`${RouterService.USER_URL}/${item}`);
        }
        return items.some(item => this.router.isUrlActive(item, false));
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
