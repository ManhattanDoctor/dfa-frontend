import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { PipeService } from '@core/service';
import { CoinOpenCommand } from '@feature/coin/transport';
import { CoinMapCollection, CoinMenu, CoinTableSettings } from '@core/lib/coin';
import { Coin } from '@common/platform/coin';

@Component({
    templateUrl: './coins-page.component.html',
    standalone: false
})
export class CoinsPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: CoinTableSettings;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, pipe: PipeService, private transport: Transport, public menu: CoinMenu, public items: CoinMapCollection) {
        super();
        ViewUtil.addClasses(container, 'd-flex flex-column h-100');

        this.settings = new CoinTableSettings(pipe)
        if (!this.items.isDirty) {
            this.items.load();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Coin>): Promise<void> {
        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new CoinOpenCommand({ id: item.data.id, isBriefly: true }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }
}