import { TransportCommand } from '@ts-core/common';

export class CoinSubmitCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CoinSubmitCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(CoinSubmitCommand.NAME);
    }
}