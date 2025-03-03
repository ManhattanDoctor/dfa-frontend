import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { CDK_TABLE_COLUMN_MENU_NAME, ICdkTableCellEvent, MenuTriggerForDirective } from '@ts-core/angular-material';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { PipeService } from '@core/service';
import { CompanyMapCollection, CompanyMenu, CompanyTableSettings } from '@core/lib/company';
import { Company } from '@common/platform/company';
import { EntityOpenCommand } from '../../module/feature/entity/transport';
import { EntityType } from '@feature/entity';

@Component({
    templateUrl: './companies-page.component.html',
    standalone: false
})
export class CompaniesPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: CompanyTableSettings;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, pipe: PipeService, private transport: Transport, public menu: CompanyMenu, public items: CompanyMapCollection) {
        super();
        ViewUtil.addClasses(container, 'd-flex flex-column h-100');

        this.settings = new CompanyTableSettings(pipe)
        if (!this.items.isDirty) {
            this.items.load();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Company>): Promise<void> {
        if (item.column !== CDK_TABLE_COLUMN_MENU_NAME) {
            this.transport.send(new EntityOpenCommand({ id: item.data.id, type: EntityType.COMPANY, isBriefly: true }));
        }
        else {
            this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }
}