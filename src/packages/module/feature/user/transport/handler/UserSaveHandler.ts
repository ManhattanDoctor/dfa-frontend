import { Injectable } from '@angular/core';
import { Logger, ExtendedError, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
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
        if (_.isNil(params.id)) {
            if (this.user.isLogined) {
                params.id = this.user.id.toString();
            }
            throw new ExtendedError('Unable to save user: uid is nil');
        }
        let item = await this.api.userEdit(params.id, params);
        if (this.user.isUser(item)) {
            this.user.userUpdate(item);
        }
        return item;
    }
}
