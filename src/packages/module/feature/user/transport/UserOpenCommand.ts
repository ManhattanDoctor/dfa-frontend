import { EntityObjectOpenCommand, IEntityObjectOpenDto } from '@feature/entity/transport';

export class UserOpenCommand extends EntityObjectOpenCommand {
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

    constructor(request: IEntityObjectOpenDto) {
        super(request, UserOpenCommand.NAME);
    }
}