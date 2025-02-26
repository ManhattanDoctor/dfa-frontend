import { Component, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, ICdkTableSettings, MenuTriggerForDirective, VIMatModule } from '@ts-core/angular-material';
import { ActionMapCollection, ActionMenu, ActionTableSettings, } from '@core/lib/action';
import { EntityObjectService, PipeService } from '@core/service';
import { Action } from '@common/platform';
import { ViewUtil } from '@ts-core/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import * as _ from 'lodash';

@Component({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        VIMatModule,
    ],
    selector: 'actions',
    templateUrl: 'actions.component.html',
    providers: [ActionMapCollection]
})
export class ActionsComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    private _uid: string;
    public settings: ICdkTableSettings<Action>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ViewContainerRef,
        pipe: PipeService,
        entityObject: EntityObjectService,
        private transport: Transport,
        public items: ActionMapCollection,
        public menu: ActionMenu
    ) {
        super();
        ViewUtil.addClasses(element.element, 'd-flex');

        this.settings = new ActionTableSettings(pipe, entityObject);
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private commitUidProperties(): void {
        this.items.conditions.objectUid = this.uid;
        this.items.reload();
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Action>): Promise<void> {
        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            // this.transport.send(new EntityObjectOpenCommand({ id: item.data.objectUid, isBriefly: true }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get uid(): string {
        return this._uid;
    }
    @Input()
    public set uid(value: string) {
        if (value === this._uid) {
            return;
        }
        this._uid = value;
        if (!_.isNil(value)) {
            this.commitUidProperties();
        }
    }
}
