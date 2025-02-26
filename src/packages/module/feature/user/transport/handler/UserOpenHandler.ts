import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { RouterService } from '@core/service';
import { UserOpenCommand } from '../UserOpenCommand';
import { Client } from '@common/platform/api';
import { User } from '@common/platform/user';
import { EntityObjectOpenHandler } from '@feature/hlf/transport/handler';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { EntityObjectId } from '@feature/hlf';
import { UserContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserOpenHandler extends EntityObjectOpenHandler<User> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client) {
        super(logger, transport, UserOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getComponent(): ComponentType<any> {
        return UserContainerComponent;
    }

    protected async getItem(id: EntityObjectId): Promise<User> {
        return this.api.userGet(id.toString());
    }

    protected getUrl(id: EntityObjectId): string {
        return `${RouterService.USER_URL}/${id}`;
    }
}
