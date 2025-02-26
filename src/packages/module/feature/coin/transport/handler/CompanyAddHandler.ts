import { Injectable } from '@angular/core';
import { NotificationService, WindowConfig } from '@ts-core/angular';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { CompanyAddCommand } from '../CompanyAddCommand';
import { Client } from '@common/platform/api';
import { CompanyService } from '@core/service';
import { PortalService } from '@ts-core/angular-material';
import { takeUntil } from 'rxjs';
import { CompanyAddComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyAddHandler extends TransportCommandHandler<void, CompanyAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private company: CompanyService, private api: Client) {
        super(logger, transport, CompanyAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        let windowId = 'companyAdd';
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 480);
        config.id = windowId;

        let content = this.portal.open(CompanyAddComponent, config);

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CompanyAddComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        await this.api.companyAdd(content.serialize());
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
