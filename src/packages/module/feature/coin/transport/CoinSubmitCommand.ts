import { TransportCommand } from '@ts-core/common';

export class CoinSubmitCommand extends TransportCommand<number> {
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

    constructor(request: number) {
        super(CoinSubmitCommand.NAME, request);
    }
}