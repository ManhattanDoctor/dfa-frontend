import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems, ViewUtil } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { ObjectUtil, Transport } from '@ts-core/common';
import { MenuTriggerForDirective, VIMatModule } from '@ts-core/angular-material';
import { ActionsComponent, CoinDetailsComponent, EntityComponent, FinanceActionsComponent } from '@shared/component';
import { TransportSocket } from '@ts-core/socket-client';
import { Coin } from '@common/platform/coin';
import { CoinMenu } from '@core/lib/coin';
import { getSocketCoinRoom } from '@common/platform';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CoinChangedEvent } from '@common/platform/transport';
import { filter, map, takeUntil } from 'rxjs';
import { CoinNamePipe } from '@shared/pipe/coin';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoinBalancesComponent } from '@shared/component';
import { EntityType } from '@feature/entity';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        VIMatModule,
        ActionsComponent,
        CoinNamePipe,
        CoinDetailsComponent,
        CoinBalancesComponent,
    ],
    selector: 'coin-container',
    templateUrl: 'coin-container.component.html'
})
export class CoinContainerComponent extends EntityComponent<Coin> {

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
        public menu: CoinMenu,
    ) {
        super(container, transport);
        ViewUtil.addClasses(container, 'd-flex flex-column');

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('coin.coin', 0, 'COMPANY'));
        this.tabs.add(new SelectListItem('coin.balance.balances', 1, 'COIN_BALANCES'));
        this.tabs.add(new SelectListItem('action.actions', 2, 'ACTIONS'));
        this.tabs.complete(0);

        socket.getDispatcher<CoinChangedEvent>(CoinChangedEvent.NAME)
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

    protected commitItemProperties(): void {
        super.commitItemProperties();

        this.tabs.getByIndex(1).isEnabled = !_.isNil(this.item.hlfUid);
        this.tabs.getByIndex(2).isEnabled = !_.isNil(this.item.hlfUid);
    }

    protected itemOpenedHandler(item: Coin): void {
        this.socket.roomAdd(getSocketCoinRoom(item.id));
    }

    protected itemClosedHandler(item: Coin): void {
        this.socket.roomRemove(getSocketCoinRoom(item.id));
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

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get type(): EntityType {
        return EntityType.COIN;
    }
}
