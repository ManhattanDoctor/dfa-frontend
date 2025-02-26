import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { Action } from '@common/platform';
import { EntityObjectComponent } from '@shared/component';
import { EntityObjectOpenCommand } from '@feature/entity/transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ActionMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static REQUEST = 10;
    private static COMPANY = 20;
    private static USER = 30;
    private static COIN = 60;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        language: LanguageService,
        transport: Transport
    ) {
        super(language, true);

        let item: MenuListItem = null;

        item = new MenuListItem('hlf.seeInBlockchain', ActionMenu.REQUEST, null, 'fas fa fa-hashtag me-2');
        // item.action = (item, action) => transport.send(new HlfTransactionOpenCommand(action.requestId));
        // this.add(item);

        item = new MenuListItem('coin.coin', ActionMenu.COIN, null, 'fas fa fa-coins me-2');
        item.checkEnabled = (item, action) => !_.isNil(action.coinUid);
        item.action = (item, action) => transport.send(new EntityObjectOpenCommand(EntityObjectOpenCommand.NAME, { id: action.coinUid, isBriefly: true }));
        this.add(item);

        item = new MenuListItem('company.company', ActionMenu.COMPANY, null, 'fas fa fa-building me-2');
        item.checkEnabled = (item, action) => !_.isNil(action.userUid);
        item.action = (item, action) => transport.send(new EntityObjectOpenCommand(EntityObjectOpenCommand.NAME, { id: action.userUid, isBriefly: true }));
        this.add(item);

        item = new MenuListItem('user.user', ActionMenu.USER, null, 'fas fa fa-user me-2');
        item.checkEnabled = (item, action) => !_.isNil(action.initiatorUid);
        item.action = (item, action) => transport.send(new EntityObjectOpenCommand(EntityObjectOpenCommand.NAME, { id: action.initiatorUid, isBriefly: true }));
        this.add(item);

        this.complete();
    }

}

class MenuListItem extends ListItem<void> {
    declare action: (item: ListItem, action: Action) => void;
    declare checkEnabled: (item: ListItem, action: Action) => boolean;
}
