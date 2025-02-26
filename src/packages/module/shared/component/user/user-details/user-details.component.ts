import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { User } from '@common/platform/user';
import { ObjectUtil } from '@ts-core/common';
import { VIMatModule } from '@ts-core/angular-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TransportSocket } from '@ts-core/socket-client';
import { UserChangedEvent } from '@common/platform/transport';
import { filter, map, takeUntil } from 'rxjs';
import { UpdatableComponent } from '@shared/component';
import { getSocketUserRoom } from '@common/platform';
import { UserService } from '@core/service';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,

        VIMatModule
    ],
    selector: 'user-details',
    templateUrl: 'user-details.component.html',
})
export class UserDetailsComponent extends UpdatableComponent<User> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private socket: TransportSocket, private service: UserService) {
        super();
        ViewUtil.addClasses(container, 'row g-0');

        socket.getDispatcher<UserChangedEvent>(UserChangedEvent.NAME)
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

    protected itemOpenedHandler(item: User): void {
        if (!this.service.isEquals(item)) {
            this.socket.roomAdd(getSocketUserRoom(item.id));
        }
    }

    protected itemClosedHandler(item: User): void {
        if (!this.service.isEquals(item)) {
            this.socket.roomRemove(getSocketUserRoom(item.id));
        }
    }
}
