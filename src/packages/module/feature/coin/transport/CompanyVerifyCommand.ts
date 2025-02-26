import { TransportCommand } from '@ts-core/common';

export class CompanyVerifyCommand extends TransportCommand<number> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CompanyVerifyCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CompanyVerifyCommand.NAME, request);
    }
}