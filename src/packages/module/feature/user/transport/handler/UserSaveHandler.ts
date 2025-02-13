import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { UserService } from '@core/service';
import { UserSaveCommand, IUserEditDto } from '../UserSaveCommand';
import { User } from '@common/platform/user';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserSaveHandler extends TransportCommandAsyncHandler<IUserEditDto, User, UserSaveCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private user: UserService, private api: Client) {
        super(logger, transport, UserSaveCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IUserEditDto): Promise<User> {
        let item = await this.api.userEdit(params.id, params);
        if (this.user.isUser(item)) {
            this.user.update(item);
        }
        return item;
    }
}
