import { SelectListItem, SelectListItems, ISelectListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { RouterService, UserService, LoginService, CompanyService, PermissionService } from '@core/service';
// import { ProfileManagerGuard } from '@feature/profile/guard';
import { takeUntil, merge } from 'rxjs';
import * as _ from 'lodash';
import { UserResolver } from '@shared/resolver';
import { ResourcePermission } from '../../../../../../externals/common/platform';

@Injectable()
export class ShellMenu extends SelectListItems<ISelectListItem<string>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static USER = 10;
    private static COMPANY = 20;

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

        item = this.add(new ShellListItem('company.company', ShellMenu.COMPANY, `/${RouterService.COMPANY_URL}`, 'fas fa-building'));
        item.checkEnabled = () => company.has;
        /*
        item = this.add(new ShellListItem('coin.balance', ShellMenu.COIN_TRANSACTIONS, `/${RouterService.COIN_TRANSACTIONS_URL}`, 'fas fa-coins'));
        item = this.add(new ShellListItem('voice.voices', ShellMenu.VOICES, `/${RouterService.VOICES_URL}`, 'fab fa-teamspeak'));
        item = this.add(new ShellListItem('profile.conversation', ShellMenu.CONVERSATIONS, `/${RouterService.CONVERSATIONS_URL}`, 'fas fa-comment'));

        item = this.management.add(new ShellListItem('management.file.title', ShellMenu.MANAGEMENT_FILES, `/${RouterService.MANAGEMENT_FILES_URL}`, 'fas fa-file'));
        item = this.management.add(new ShellListItem('management.user.title', ShellMenu.MANAGEMENT_USERS, `/${RouterService.MANAGEMENT_USERS_URL}`, 'fas fa-user'));
        item = this.management.add(new ShellListItem('management.conversation.title', ShellMenu.MANAGEMENT_CONVERSATIONS, `/${RouterService.MANAGEMENT_CONVERSATIONS_URL}`, 'fas fa-comment'));
        item = this.management.add(new ShellListItem('management.file.vector.search.search', ShellMenu.MANAGEMENT_FILE_CONTENT_VECTOR_SEARCH, `/${RouterService.MANAGEMENT_FILE_CONTENT_VECTOR_SEARCH_URL}`, 'fas fa-magnifying-glass'));
        this.management.collection.forEach(item => item.checkEnabled = () => profileManagerGuard.canActivate() === true);
        */

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