import { TransportCommand } from '@ts-core/common';

export class CoinRejectCommand extends TransportCommand<number> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CoinRejectCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CoinRejectCommand.NAME, request);
    }
}