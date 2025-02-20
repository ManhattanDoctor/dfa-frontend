import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CompanyVerifyCommand } from '../CompanyVerifyCommand';
import { NotificationService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyVerifyHandler extends TransportCommandHandler<number, CompanyVerifyCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private windows: WindowService, private notifications: NotificationService) {
        super(logger, transport, CompanyVerifyCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: number): Promise<void> {
        await this.windows.question('company.verify.confirmation').yesNotPromise;
        await this.api.companyVerify(params);
        this.notifications.info('company.verify.notification');
    }
}
