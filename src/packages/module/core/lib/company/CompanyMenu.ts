import { ListItem, ListItems, IListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { PermissionService, RouterService, CompanyService } from '@core/service';
import { Transport } from '@ts-core/common';
import { CompanyActivateCommand, CompanyEditCommand, CompanyRejectCommand, CompanySubmitCommand, CompanyVerifyCommand } from '@feature/company/transport';
import { Company, CompanyUtil } from '@common/platform/company';
import { CoinAddCommand } from '@feature/coin/transport';
import { EntityOpenCommand } from '@feature/entity/transport';
import { EntityType } from '@feature/entity';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyMenu extends ListItems<IListItem> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static OPEN = 10;
    private static EDIT = 20;
    private static COIN_ADD = 30;

    private static SUBMIT = 0;
    private static VERIFY = 0;
    private static REJECT = 0;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, private router: RouterService, private service: CompanyService, permission: PermissionService) {
        super(language);

        let item: IListItem = null;

        item = this.add(new MenuItem('general.edit.edit', CompanyMenu.EDIT, 'fa fa-cog me-2'));
        item.action = (item, company) => transport.send(new CompanyEditCommand(company.id));
        item.checkEnabled = (item, company) => CompanyUtil.isCanEdit(company, permission.resources, false);

        item = this.add(new MenuItem('company.company', CompanyMenu.OPEN, 'fa fa-building me-2'));
        item.action = (item, company) => transport.send(new EntityOpenCommand({ id: company.id, type: EntityType.COMPANY, isBriefly: true }));
        item.checkEnabled = (item, company) => !this.isPageOpen(company.id) && CompanyUtil.isCanRead(permission.resources, false);

        item = this.add(new MenuItem('company.submit.submit', CompanyMenu.SUBMIT, 'fa fa-arrow-right me-2'));
        item.action = (item, company) => transport.send(new CompanySubmitCommand());
        item.checkEnabled = (item, company) => CompanyUtil.isCanSubmit(company, permission.resources, false);

        item = this.add(new MenuItem('company.activate.activate', CompanyMenu.VERIFY, 'fa fa-check me-2'));
        item.action = (item, company) => transport.send(new CompanyActivateCommand());
        item.checkEnabled = (item, company) => CompanyUtil.isCanActivate(company, permission.resources, false);

        item = this.add(new MenuItem('company.verify.verify', CompanyMenu.VERIFY, 'fa fa-check me-2'));
        item.action = (item, company) => transport.send(new CompanyVerifyCommand(company.id));
        item.checkEnabled = (item, company) => CompanyUtil.isCanVerify(company, permission.resources, false);

        item = this.add(new MenuItem('company.reject.reject', CompanyMenu.REJECT, 'fa fa-xmark me-2'));
        item.action = (item, company) => transport.send(new CompanyRejectCommand(company.id));
        item.checkEnabled = (item, company) => CompanyUtil.isCanReject(company, permission.resources, false);

        item = this.add(new MenuItem('coin.add.add', CompanyMenu.COIN_ADD, 'fa fa-coins me-2'));
        item.action = (item, company) => transport.send(new CoinAddCommand());
        item.checkEnabled = (item, company) => CompanyUtil.isCanCoinAdd(company, permission.resources, false);

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isPageOpen(item: number): boolean {
        let items = [RouterService.COMPANY_URL];
        if (this.service.isEquals(item)) {
            items.push(`${RouterService.COMPANY_URL}/${item}`);
        }
        return items.some(item => this.router.isUrlActive(item, false));
    }
}

class MenuItem extends ListItem<void> {
    declare action: (item: ListItem, company: Company) => void;
    declare checkEnabled: (item: ListItem, company: Company) => boolean;
    constructor(translationId: string, sortIndex: number, iconId: string) {
        super(translationId, sortIndex);
        this.iconId = iconId;
    }
}
