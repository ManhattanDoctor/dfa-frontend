import { Injectable } from '@angular/core';
import { Destroyable, Transport } from '@ts-core/common';
import { CompanyAddWizardCommand } from '@feature/company/transport';
import { PermissionService } from './PermissionService';
import { map, merge, takeUntil } from 'rxjs';
import { UserService } from './UserService';
import { CompanyUtil } from '@common/platform/company';
import { SocketService } from './SocketService';
import { CoinAddedEvent, CompanyAddedEvent } from '@common/platform/transport';
import { EntityOpenCommand } from '@feature/entity/transport';
import { EntityType } from '@feature/entity';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ActionService extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        user: UserService,
        socket: SocketService,
        private transport: Transport,
        private permission: PermissionService,
    ) {
        super();
        merge(user.logined, permission.completed).pipe(takeUntil(this.destroyed)).subscribe(() => this.check());


        socket.getDispatcher<CoinAddedEvent>(CoinAddedEvent.NAME)
            .pipe(
                map(item => item.data),
                takeUntil(this.destroyed)
            ).subscribe(async item => transport.send(new EntityOpenCommand({ id: item.id, type: EntityType.COIN, isBriefly: true })));

        socket.getDispatcher<CompanyAddedEvent>(CompanyAddedEvent.NAME)
            .pipe(
                map(item => item.data),
                takeUntil(this.destroyed)
            ).subscribe(async item => transport.send(new EntityOpenCommand({ id: item.id, type: EntityType.COMPANY, isBriefly: true })));

    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    protected async check(): Promise<void> {
        if (CompanyUtil.isCanAdd(this.permission.resources, false)) {
            // this.transport.send(new CompanyAddWizardCommand());
        }
    }
}

