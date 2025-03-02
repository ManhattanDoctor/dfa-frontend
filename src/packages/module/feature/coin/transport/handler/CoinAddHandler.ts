import { Injectable } from '@angular/core';
import { NotificationService, WindowConfig } from '@ts-core/angular';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { CoinAddCommand } from '../CoinAddCommand';
import { Client } from '@common/platform/api';
import { PortalService } from '@ts-core/angular-material';
import { takeUntil } from 'rxjs';
import { CoinAddComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinAddHandler extends TransportCommandHandler<void, CoinAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private api: Client) {
        super(logger, transport, CoinAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        let windowId = 'coinAdd';
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 480);
        config.id = windowId;


        let content = this.portal.open(CoinAddComponent, config);

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CoinAddComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.coinAdd(content.serialize());
                        this.notifications.info('general.save.notification');
                        content.close();
                    }
                    finally {
                        content.isDisabled = false;
                    }
                    break;
            }
        });
    }
}
