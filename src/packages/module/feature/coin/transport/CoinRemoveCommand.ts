import { TransportCommand } from '@ts-core/common';

export class CoinRemoveCommand extends TransportCommand<number> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CoinRemoveCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CoinRemoveCommand.NAME, request);
    }
}