import { TransportCommand } from '@ts-core/common';

export class CoinAddCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CoinAddCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(CoinAddCommand.NAME);
    }
}
