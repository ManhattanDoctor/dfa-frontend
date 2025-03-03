import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { RouterService } from '@core/service';
import { UserOpenCommand } from '../UserOpenCommand';
import { Client } from '@common/platform/api';
import { User } from '@common/platform/user';
import { EntityHandler } from '@feature/entity/transport/handler';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { EntityId } from '@feature/entity';
import { UserContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserOpenHandler extends EntityHandler<User> {
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

    protected getUrl(id: EntityId): string {
        return `${RouterService.USER_URL}/${id}`;
    }

    protected getPrefix(): string {
        return 'user';
    }

    protected getComponent(): ComponentType<any> {
        return UserContainerComponent;
    }

    protected async getItem(id: EntityId): Promise<User> {
        return this.api.userGet(id.toString());
    }
}
