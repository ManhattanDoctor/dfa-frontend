import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CompanyActivateCommand } from '../CompanyActivateCommand';
import { NotificationService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyActivateHandler extends TransportCommandHandler<void, CompanyActivateCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private windows: WindowService, private notifications: NotificationService) {
        super(logger, transport, CompanyActivateCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        await this.windows.question('company.activate.confirmation').yesNotPromise;
        await this.api.companyActivate();
        this.notifications.info('company.activate.notification');
    }
}
