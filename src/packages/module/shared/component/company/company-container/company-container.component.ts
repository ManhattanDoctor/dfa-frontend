import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems, ViewUtil } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { ObjectUtil, Transport } from '@ts-core/common';
import { MenuTriggerForDirective, VIMatModule } from '@ts-core/angular-material';
import { ActionsComponent, CompanyDetailsComponent, CompanyPictureComponent, EntityObjectComponent, FinanceActionsComponent } from '@shared/component';
import { TransportSocket } from '@ts-core/socket-client';
import { Company } from '@common/platform/company';
import { CompanyMenu } from '@core/lib/company';
import { getSocketCompanyRoom } from '@common/platform';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CompanyChangedEvent } from '@common/platform/transport';
import { filter, map, takeUntil } from 'rxjs';
import { CompanyNamePipe } from '@shared/pipe/company';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoinBalancesComponent } from '@shared/component';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        VIMatModule,
        ActionsComponent,
        FinanceActionsComponent,
        CompanyNamePipe,
        CoinBalancesComponent,
        CompanyPictureComponent,
        CompanyDetailsComponent,
    ],
    selector: 'company-container',
    templateUrl: 'company-container.component.html'
})
export class CompanyContainerComponent extends EntityObjectComponent<Company> {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public tabs: SelectListItems<ISelectListItem<string>>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        transport: Transport,
        language: LanguageService,
        private socket: TransportSocket,
        public menu: CompanyMenu,
    ) {
        super(container, transport);
        ViewUtil.addClasses(container, 'd-flex flex-column');

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('company.company', 0, 'COMPANY'));
        this.tabs.add(new SelectListItem('coin.balances', 1, 'COIN_BALANCES'));
        this.tabs.add(new SelectListItem('action.actions', 2, 'ACTIONS'));
        this.tabs.add(new SelectListItem('action.finances', 3, 'FINANCE_ACTIONS'));
        this.tabs.complete(0);

        socket.getDispatcher<CompanyChangedEvent>(CompanyChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                filter(item => item.id === this.item.id),
                takeUntil(this.destroyed)
            ).subscribe(item => ObjectUtil.copyPartial(item, this.item));
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected itemOpenedHandler(item: Company): void {
        this.socket.roomAdd(getSocketCompanyRoom(item.id));
    }

    protected itemClosedHandler(item: Company): void {
        this.socket.roomRemove(getSocketCompanyRoom(item.id));
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async menuOpen(event: MouseEvent): Promise<void> {
        this.menu.refresh(this.item);
        this.trigger.openMenuOn(event.target);
    }
}
