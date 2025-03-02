import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CoinSaveCommand, ICoinSaveDto } from '../CoinSaveCommand';
import { Coin } from '@common/platform/coin';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinSaveHandler extends TransportCommandAsyncHandler<ICoinSaveDto, Coin, CoinSaveCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client) {
        super(logger, transport, CoinSaveCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: ICoinSaveDto): Promise<Coin> {
        return this.api.coinEdit(params);
    }
}
