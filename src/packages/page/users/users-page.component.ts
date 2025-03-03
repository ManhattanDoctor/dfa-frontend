import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { PipeService } from '@core/service';
import { UserMapCollection, UserMenu, UserTableSettings } from '@core/lib/user';
import { User } from '@common/platform/user';
import { EntityOpenCommand } from '@feature/entity/transport';
import { EntityType } from '@feature/entity';

@Component({
    templateUrl: './users-page.component.html',
    standalone: false
})
export class UsersPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: UserTableSettings;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, pipe: PipeService, private transport: Transport, public menu: UserMenu, public items: UserMapCollection) {
        super();
        ViewUtil.addClasses(container, 'd-flex flex-column h-100');

        this.settings = new UserTableSettings(pipe)
        if (!this.items.isDirty) {
            this.items.load();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<User>): Promise<void> {
        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new EntityOpenCommand({ id: item.data.id, type: EntityType.USER, isBriefly: true }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }
}