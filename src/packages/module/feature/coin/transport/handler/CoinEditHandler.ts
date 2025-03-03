import { Injectable } from '@angular/core';
import { NotificationService, WindowClosedError, WindowConfig, WindowEvent } from '@ts-core/angular';
import { ExtendedError, Logger, PromiseHandler, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { CoinEditCommand, ICoinEditDtoResponse } from '../CoinEditCommand';
import { Client } from '@common/platform/api';
import { PortalService } from '@ts-core/angular-material';
import { takeUntil } from 'rxjs';
import { CoinEditComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinEditHandler extends TransportCommandAsyncHandler<number, ICoinEditDtoResponse, CoinEditCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private api: Client) {
        super(logger, transport, CoinEditCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: number): Promise<ICoinEditDtoResponse> {
        let windowId = 'coinEdit' + params;
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let item = await this.api.coinGet(params);
        let config = new WindowConfig(true, false, 480);
        config.id = windowId;

        let promise = PromiseHandler.create<ICoinEditDtoResponse, ExtendedError>();

        let content = this.portal.open(CoinEditComponent, config);
        content.coin = item;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CoinEditComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        item = await this.api.coinEdit(item.id, content.serialize());
                        this.notifications.info('general.save.notification');
                    }
                    finally {
                        content.isDisabled = false;
                    }
                    promise.resolve(item);
                    content.close();
                    break;
                case WindowEvent.CLOSED:
                    promise.reject(new WindowClosedError());
                    break;
            }
        });
        return promise.promise;
    }
}
