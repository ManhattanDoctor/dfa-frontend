import { TransportCommand } from '@ts-core/common';

export class CompanyAddUserCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CompanyAddUserCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(CompanyAddUserCommand.NAME);
    }
}
