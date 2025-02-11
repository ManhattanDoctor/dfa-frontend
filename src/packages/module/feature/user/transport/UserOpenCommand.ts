import { TransportCommand } from '@ts-core/common';

export class UserOpenCommand extends TransportCommand<IUserOpenDto> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'UserOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IUserOpenDto) {
        super(UserOpenCommand.NAME, request);
    }
}

export interface IUserOpenDto {
    id: string;
    isBriefly?: boolean;
}
