import { ListItem, ListItems, IListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { PermissionService, PipeService, RouterService, CompanyService } from '@core/service';
import { Transport } from '@ts-core/common';
import { CompanyEditCommand, CompanyOpenCommand } from '../transport';
import { ResourcePermission } from '@common/platform';
import { Company } from '@common/platform/company';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyMenu extends ListItems<IListItem> {
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

    constructor(language: LanguageService, transport: Transport, private router: RouterService, private service: CompanyService, private permission: PermissionService) {
        super(language);

        let item: IListItem = null;

        item = this.add(new MenuItem('company.company', CompanyMenu.OPEN, 'fa fa-building me-2'));
        item.action = (item, company) => transport.send(new CompanyOpenCommand({ id: company.id, isBriefly: false }));
        item.checkEnabled = (item, company) => !this.isPageOpen(company.id) && permission.hasResourceScope(ResourcePermission.COMPANY_READ);

        item = this.add(new MenuItem('general.edit.edit', CompanyMenu.EDIT, 'fa fa-pen me-2'));
        item.action = (item, company) => transport.send(new CompanyEditCommand(company.id));
        item.checkEnabled = (item, company) => permission.hasResourceScope(ResourcePermission.COMPANY_EDIT);

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isPageOpen(item: number): boolean {
        let items = [RouterService.COMPANY_URL];
        if (this.service.isCompany(item)) {
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
