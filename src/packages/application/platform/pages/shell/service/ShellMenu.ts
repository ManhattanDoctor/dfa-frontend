import { SelectListItem, SelectListItems, ISelectListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { RouterService, UserService, CompanyService, PermissionService } from '@core/service';
import { takeUntil, merge } from 'rxjs';
import { CompanyUtil } from '@common/platform/company';
import { UserUtil } from '@common/platform/user';
import * as _ from 'lodash';

@Injectable()
export class ShellMenu extends SelectListItems<ISelectListItem<string>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static USER = 10;
    private static COMPANY = 30;
    private static USERS = 20;
    private static COMPANIES = 40;

    public management: SelectListItems<ISelectListItem<string>>;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, router: RouterService, user: UserService, permission: PermissionService, company: CompanyService) {
        super(language);

        this.management = new SelectListItems(language);

        let item: ISelectListItem<string> = null;
        item = this.add(new ShellListItem('user.user', ShellMenu.USER, `/${RouterService.USER_URL}`, 'fas fa-user'));
        item.checkEnabled = () => user.has;

        item = this.add(new ShellListItem('user.users', ShellMenu.USERS, `/${RouterService.USERS_URL}`, 'fas fa-users'));
        item.checkEnabled = (item, company) => UserUtil.isCanList(permission.resources, false);

        item = this.add(new ShellListItem('company.company', ShellMenu.COMPANY, `/${RouterService.COMPANY_URL}`, 'fas fa-building'));
        item.checkEnabled = () => company.has;

        item = this.add(new ShellListItem('company.companies', ShellMenu.COMPANIES, `/${RouterService.COMPANIES_URL}`, 'fas fa-city'));
        item.checkEnabled = (item, company) => CompanyUtil.isCanList(permission.resources, false);

        for (let item of [...this.collection, ...this.management.collection]) {
            item.action = item => router.navigate(item.data);
            item.checkSelected = item => router.isUrlActive(item.data, false);
        }
        router.finished.pipe(takeUntil(this.destroyed)).subscribe(() => this.refreshSelection());

        merge(user.changed, company.changed).pipe(takeUntil(this.destroyed)).subscribe(() => this.refresh());

        [this, this.management].forEach(item => item.complete());
        this.refresh();
    }

    public refreshSelection(): void {
        super.refreshSelection();
        this.management.refreshSelection();
    }
}

export class ShellListItem extends SelectListItem<string> {
    constructor(translationId: string, sortIndex: number, url: string, iconId: string) {
        super(translationId, sortIndex, url);
        this.iconId = iconId;
    }
}