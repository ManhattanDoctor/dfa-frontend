import { TransportCommand } from '@ts-core/common';

export class CoinActivateCommand extends TransportCommand<number> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CoinActivateCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CoinActivateCommand.NAME, request);
    }
}