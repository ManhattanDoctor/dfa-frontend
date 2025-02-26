import { TransportCommandAsync } from '@ts-core/common';
import { Coin } from '@common/platform/coin';

export class CoinEditCommand extends TransportCommandAsync<number, ICoinEditDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinEditCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CoinEditCommand.NAME, request);
    }
}

export type ICoinEditDtoResponse = Coin;
