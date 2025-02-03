import { TransportCommandAsync } from '@ts-core/common';
import { User } from '@common/platform/user';
import { UserUid } from '@ts-core/angular';

export class ProfileEditCommand extends TransportCommandAsync<IProfileEditDto, IProfileEditDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ProfileEditCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IProfileEditDto) {
        super(ProfileEditCommand.NAME, request);
    }
}

export type IProfileEditDto = UserUid;
export type IProfileEditDtoResponse = User;
