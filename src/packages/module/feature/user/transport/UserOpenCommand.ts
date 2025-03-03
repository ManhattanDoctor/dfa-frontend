import { EntityOpenCommand, IEntityOpenDto } from '@feature/entity/transport';

export class UserOpenCommand extends EntityOpenCommand {
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

    constructor(request: IEntityOpenDto) {
        super(request, UserOpenCommand.NAME);
    }
}