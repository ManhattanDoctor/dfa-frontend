import { Component, ViewContainerRef } from '@angular/core';
import { FilterableConditionType, FilterableDataType } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { ActionFinanceTableSettings, ActionMapCollection, ActionMenu, ActionTableSettings, } from '@core/lib/action';;
import { EntityService, PipeService } from '@core/service';
import { ActionsComponent } from './actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { VIMatModule } from '@ts-core/angular-material';
import * as _ from 'lodash';

@Component({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        VIMatModule,
    ],
    selector: 'finance-actions',
    templateUrl: 'actions.component.html',
    providers: [ActionMapCollection]
})
export class FinanceActionsComponent extends ActionsComponent {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ViewContainerRef,
        pipe: PipeService,
        entity: EntityService,
        items: ActionMapCollection,
        menu: ActionMenu
    ) {
        super(element, pipe, entity, items, menu);
        this.settings = new ActionFinanceTableSettings(pipe, entity);
        items.conditions.amount = { type: FilterableDataType.NUMBER, condition: FilterableConditionType.NOT_NULL, value: null };
    }
}
