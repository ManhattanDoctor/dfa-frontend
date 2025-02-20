import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CompanySubmitCommand } from '../CompanySubmitCommand';
import { NotificationService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanySubmitHandler extends TransportCommandHandler<void, CompanySubmitCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private windows: WindowService, private notifications: NotificationService) {
        super(logger, transport, CompanySubmitCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        await this.windows.question('company.submit.confirmation').yesNotPromise;
        await this.api.companySubmit();
        this.notifications.info('company.submit.notification');
    }
}
