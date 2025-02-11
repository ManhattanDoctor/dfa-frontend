import { TransportCommandAsync } from '@ts-core/common';
import { User } from '@common/platform/user';

export class UserEditCommand extends TransportCommandAsync<string, IUserEditDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'UserEditCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: string) {
        super(UserEditCommand.NAME, request);
    }
}

export type IUserEditDtoResponse = User;
