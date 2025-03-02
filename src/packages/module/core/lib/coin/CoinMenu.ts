import { ListItem, ListItems, IListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { CompanyService, PermissionService, RouterService } from '@core/service';
import { Transport } from '@ts-core/common';
import { CoinActivateCommand, CoinEditCommand, CoinOpenCommand, CoinRejectCommand, CoinSubmitCommand, CoinVerifyCommand } from '@feature/coin/transport';
import { Coin, CoinUtil } from '@common/platform/coin';
import { CompanyUtil } from '@common/platform/company';
import { EntityObjectOpenCommand } from '@feature/entity/transport';
import { EntityObjectType } from '@feature/entity';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinMenu extends ListItems<IListItem> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static OPEN = 0;
    private static EDIT = 10;
    private static SUBMIT = 20;
    private static VERIFY = 20;
    private static REJECT = 20;
    private static COMPANY = 30;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, permission: PermissionService, company: CompanyService, private router: RouterService) {
        super(language);

        let item: IListItem = null;

        item = this.add(new MenuItem('general.edit.edit', CoinMenu.EDIT, 'fa fa-cog me-2'));
        item.action = (item, coin) => transport.send(new CoinEditCommand(coin.id));
        item.checkEnabled = (item, coin) => CoinUtil.isCanEdit(company.company, coin, permission.resources, false);

        item = this.add(new MenuItem('company.company', CoinMenu.COMPANY, 'fa fa-building me-2'));
        item.action = (item, coin) => transport.send(new EntityObjectOpenCommand({ id: coin.id, type: EntityObjectType.COMPANY, isBriefly: true }));
        item.checkEnabled = (item, coin) => !_.isNil(coin.companyId) && CompanyUtil.isCanRead(permission.resources, false);

        item = this.add(new MenuItem('coin.coin', CoinMenu.OPEN, 'fa fa-coins me-2'));
        item.action = (item, coin) => transport.send(new CoinOpenCommand({ id: coin.id, isBriefly: true }));
        item.checkEnabled = (item, coin) => !this.isPageOpen(coin.id) && CoinUtil.isCanRead(permission.resources, false);

        item = this.add(new MenuItem('coin.submit.submit', CoinMenu.SUBMIT, 'fa fa-arrow-right me-2'));
        item.action = (item, coin) => transport.send(new CoinSubmitCommand(coin.id));
        item.checkEnabled = (item, coin) => CoinUtil.isCanSubmit(company.company, coin, permission.resources, false);

        item = this.add(new MenuItem('coin.activate.activate', CoinMenu.VERIFY, 'fa fa-check me-2'));
        item.action = (item, coin) => transport.send(new CoinActivateCommand(coin.id));
        item.checkEnabled = (item, coin) => CoinUtil.isCanActivate(company.company, coin, permission.resources, false);

        item = this.add(new MenuItem('coin.verify.verify', CoinMenu.VERIFY, 'fa fa-check me-2'));
        item.action = (item, coin) => transport.send(new CoinVerifyCommand(coin.id));
        item.checkEnabled = (item, coin) => CoinUtil.isCanVerify(coin, permission.resources, false);

        item = this.add(new MenuItem('coin.reject.reject', CoinMenu.REJECT, 'fa fa-xmark me-2'));
        item.action = (item, coin) => transport.send(new CoinRejectCommand(coin.id));
        item.checkEnabled = (item, coin) => CoinUtil.isCanReject(coin, permission.resources, false);

        /*
        item = this.add(new MenuItem('general.edit.edit', CoinMenu.EDIT, 'fa fa-pen me-2'));
        item.action = (item, coin) => transport.send(new CoinEditCommand(coin.id));
        // item.checkEnabled = (item, coin) => permission.has(ResourcePermission.COMPANY_EDIT);
        */

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isPageOpen(item: number): boolean {
        return this.router.isUrlActive(`${RouterService.COIN_URL}/${item}`, false);
    }
}

class MenuItem extends ListItem<void> {
    declare action: (item: ListItem, coin: Coin) => void;
    declare checkEnabled: (item: ListItem, coin: Coin) => boolean;
    constructor(translationId: string, sortIndex: number, iconId: string) {
        super(translationId, sortIndex);
        this.iconId = iconId;
    }
}
