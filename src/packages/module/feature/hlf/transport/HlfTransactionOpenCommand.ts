
import { TransportCommand } from '@ts-core/common';

export class HlfTransactionOpenCommand extends TransportCommand<string> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'HlfTransactionOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: string) {
        super(HlfTransactionOpenCommand.NAME, request);
    }
}
