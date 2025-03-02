import { TransportCommandAsync } from '@ts-core/common';
import { Coin } from '@common/platform/coin';
import { CoinType, ICoinSeries } from '@common/hlf/coin';
import { ICoinData } from '@common/hlf/coin/data';
import { ICoinPermission } from '@common/hlf/coin/permission';

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

    name: string;
    type: CoinType;
    ticker: string;

    data?: ICoinData;
    series?: ICoinSeries;
    permissions?: Array<ICoinPermission>;
}

