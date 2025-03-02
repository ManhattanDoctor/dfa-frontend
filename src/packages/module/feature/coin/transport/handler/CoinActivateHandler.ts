import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CoinActivateCommand } from '../CoinActivateCommand';
import { NotificationService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinActivateHandler extends TransportCommandHandler<number, CoinActivateCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private windows: WindowService, private notifications: NotificationService) {
        super(logger, transport, CoinActivateCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: number): Promise<void> {
        await this.windows.question('coin.activate.confirmation').yesNotPromise;
        await this.api.coinActivate(params);
        this.notifications.info('coin.activate.notification');
    }
}
