import { Injectable } from '@angular/core';
import { Destroyable, Transport } from '@ts-core/common';
import { CompanyAddCommand } from '@feature/company/transport';
import * as _ from 'lodash';
import { PermissionService } from './PermissionService';
import { merge, takeUntil } from 'rxjs';
import { UserService } from './UserService';
import { CompanyUtil } from '@common/platform/company';

@Injectable({ providedIn: 'root' })
export class ActionService extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        user: UserService,
        private permission: PermissionService,
        private transport: Transport) {
        super();
        merge(user.logined, permission.completed).pipe(takeUntil(this.destroyed)).subscribe(() => this.check());
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    protected async check(): Promise<void> {
        if (CompanyUtil.isCanAdd(this.permission.resources, false)) {
            this.transport.send(new CompanyAddCommand());
        }
    }
}

