import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CoinRemoveCommand } from '../CoinRemoveCommand';
import { NotificationService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinRemoveHandler extends TransportCommandHandler<number, CoinRemoveCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private windows: WindowService, private notifications: NotificationService) {
        super(logger, transport, CoinRemoveCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: number): Promise<void> {
        await this.windows.question('coin.remove.confirmation').yesNotPromise;
        await this.api.coinRemove(params);
        this.notifications.info('coin.remove.notification');
    }
}
