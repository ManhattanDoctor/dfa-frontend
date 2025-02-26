import { TransportCommandAsync } from '@ts-core/common';
import { Coin, CoinStatus } from '@common/platform/coin';

export class CoinSaveCommand extends TransportCommandAsync<ICoinSaveDto, Coin> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinSaveCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ICoinSaveDto) {
        super(CoinSaveCommand.NAME, request);
    }
}

export interface ICoinSaveDto {
    id: number;
    status?: CoinStatus;
}

