import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CoinVerifyCommand } from '../CoinVerifyCommand';
import { NotificationService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinVerifyHandler extends TransportCommandHandler<number, CoinVerifyCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private windows: WindowService, private notifications: NotificationService) {
        super(logger, transport, CoinVerifyCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: number): Promise<void> {
        await this.windows.question('coin.verify.confirmation').yesNotPromise;
        await this.api.coinVerify(params);
        this.notifications.info('coin.verify.notification');
    }
}
