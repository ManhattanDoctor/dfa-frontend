import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Company } from '@common/platform/company';
import { VIMatModule } from '@ts-core/angular-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UpdatableComponent } from '@shared/component';
import { TransportSocket } from '@ts-core/socket-client';
import { CompanyChangedEvent } from '@common/platform/transport';
import { ObjectUtil } from '@ts-core/common';
import { filter, map, takeUntil } from 'rxjs';
import { getSocketCompanyRoom } from '@common/platform';
import { CompanyService } from '@core/service';
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

    constructor(container: ViewContainerRef, private socket: TransportSocket, private service: CompanyService) {
        super();
        ViewUtil.addClasses(container, 'row g-0');

        socket.getDispatcher<CompanyChangedEvent>(CompanyChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                takeUntil(this.destroyed)
            ).subscribe(item => {
                console.log(item);
            });

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
}
