import { TransportCommand } from '@ts-core/common';

export class CoinVerifyCommand extends TransportCommand<number> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CoinVerifyCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CoinVerifyCommand.NAME, request);
    }
}