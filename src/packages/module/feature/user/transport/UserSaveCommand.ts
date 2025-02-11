import { TransportCommandAsync } from '@ts-core/common';
import { User, UserPreferences, UserStatus } from '@common/platform/user';

export class UserSaveCommand extends TransportCommandAsync<IUserEditDto, User> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'UserSaveCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IUserEditDto) {
        super(UserSaveCommand.NAME, request);
    }
}

export interface IUserEditDto {
    id: string;
    status?: UserStatus;
    preferences?: Partial<UserPreferences>;
}

