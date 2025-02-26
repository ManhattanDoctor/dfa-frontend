import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Company } from '@common/platform/company';
import { VIMatModule } from '@ts-core/angular-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UpdatableComponent } from '@shared/component';
import { TransportSocket } from '@ts-core/socket-client';
import { getSocketCompanyRoom } from '@common/platform';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,

        VIMatModule
    ],
    selector: 'company-details',
    templateUrl: 'company-details.component.html',
})
export class CompanyDetailsComponent extends UpdatableComponent<Company> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private socket: TransportSocket) {
        super();
        ViewUtil.addClasses(container, 'row g-0');
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
}
