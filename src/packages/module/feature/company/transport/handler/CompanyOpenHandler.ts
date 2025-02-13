import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport, TransportCommandHandler } from '@ts-core/common';
import { RouterService } from '@core/service';
import { ICompanyOpenDto, CompanyOpenCommand } from '../CompanyOpenCommand';
import { PortalService } from '@ts-core/angular-material';
import { WindowConfig, WindowEvent } from '@ts-core/angular';
import { filter, takeUntil } from 'rxjs';
import { Client } from '@common/platform/api';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyOpenHandler extends TransportCommandHandler<ICompanyOpenDto, CompanyOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private router: RouterService, private portal: PortalService, private api: Client) {
        super(logger, transport, CompanyOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: ICompanyOpenDto): Promise<void> {
        if (_.isNil(params.isBriefly)) {
            params.isBriefly = true;
        }
        if (params.isBriefly) {
            this.openBrief(params.id);
        } else {
            this.open(params.id);
        }
    }

    protected open(params: number): void {
        this.close(params.toString());
        this.router.navigate(`${RouterService.COMPANY_URL}/${params}`, {});
    }

    protected async openBrief(params: number): Promise<void> {
        let windowId = this.getWindowId(params.toString());
        if (this.portal.setOnTop(windowId)) {
            return;
        }

        let item = await this.api.companyGet(params);
        let config = new WindowConfig(true, false, 360);
        config.id = windowId;
        config.isExpandable = true;

        let content = null;
        /*
        this.portal.open(CompanyCardComponent, config);
        content.company = item;
        */

        content.events.pipe(
            filter(type => type === WindowEvent.EXPAND),
            takeUntil(content.destroyed)).subscribe(() => {
                this.transport.send(new CompanyOpenCommand({ id: params, isBriefly: false }));
                content.close();
            });
    }

    private getWindowId(params: string): string {
        return 'companyOpen' + params;
    }

    private close(params: string): void {
        this.portal.close(this.getWindowId(params));
    }
}
