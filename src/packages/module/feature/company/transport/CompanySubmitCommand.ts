import { TransportCommand } from '@ts-core/common';

export class CompanySubmitCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CompanySubmitCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(CompanySubmitCommand.NAME);
    }
}