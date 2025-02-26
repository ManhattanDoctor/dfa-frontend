import { Injectable } from '@angular/core';
import { NotificationService, WindowConfig } from '@ts-core/angular';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { CompanyAddWizardCommand } from '../CompanyAddWizardCommand';
import { Client } from '@common/platform/api';
import { CompanyService } from '@core/service';
import { CompanyAddCommand, CompanyAddUserCommand } from '@feature/company/transport';
import { PortalService } from '@ts-core/angular-material';
import { takeUntil } from 'rxjs';
import { CompanyAddWizardComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyAddWizardHandler extends TransportCommandHandler<void, CompanyAddWizardCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private company: CompanyService, private api: Client) {
        super(logger, transport, CompanyAddWizardCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        let windowId = 'CompanyAddWizard';
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 480);
        config.id = windowId;
        config.isDisableClose = true;

        let content = this.portal.open(CompanyAddWizardComponent, config);

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CompanyAddWizardComponent.EVENT_ADDED:
                    this.transport.send(new CompanyAddCommand());
                    content.close();
                    break;
                case CompanyAddWizardComponent.EVENT_SEARCHED:
                    this.transport.send(new CompanyAddUserCommand());
                    content.close();
                    break;
            }
        });
    }
}
