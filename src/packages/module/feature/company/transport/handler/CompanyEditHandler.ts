import { Injectable } from '@angular/core';
import { NotificationService, WindowClosedError, WindowConfig, WindowEvent } from '@ts-core/angular';
import { ExtendedError, Logger, PromiseHandler, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { CompanyEditCommand, ICompanyEditDtoResponse } from '../CompanyEditCommand';
import { Client } from '@common/platform/api';
import { PortalService } from '@ts-core/angular-material';
import { takeUntil } from 'rxjs';
import { CompanyEditComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyEditHandler extends TransportCommandAsyncHandler<number, ICompanyEditDtoResponse, CompanyEditCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private api: Client) {
        super(logger, transport, CompanyEditCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: number): Promise<ICompanyEditDtoResponse> {
        let windowId = 'companyEdit' + params;
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let item = await this.api.companyGet(params);
        let config = new WindowConfig(true, false, 480);
        config.id = windowId;

        let promise = PromiseHandler.create<ICompanyEditDtoResponse, ExtendedError>();

        let content = this.portal.open(CompanyEditComponent, config);
        content.company = item;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CompanyEditComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        item = await this.api.companyEdit(content.serialize());
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
