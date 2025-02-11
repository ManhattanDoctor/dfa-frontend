import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport, TransportCommandHandler } from '@ts-core/common';
import { RouterService } from '@core/service';
import { IUserOpenDto, UserOpenCommand } from '../UserOpenCommand';
import { PortalService } from '@ts-core/angular-material';
import { WindowConfig, WindowEvent } from '@ts-core/angular';
import { filter, takeUntil } from 'rxjs';
import { Client } from '@common/platform/api';
// import { UserCardComponent } from '../../component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserOpenHandler extends TransportCommandHandler<IUserOpenDto, UserOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private router: RouterService, private portal: PortalService, private api: Client) {
        super(logger, transport, UserOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IUserOpenDto): Promise<void> {
        if (_.isNil(params.isBriefly)) {
            params.isBriefly = true;
        }
        if (params.isBriefly) {
            this.openBrief(params.id);
        } else {
            this.open(params.id);
        }
    }

    protected open(params: string): void {
        this.close(params);
        this.router.navigate(`${RouterService.USER_URL}/${params}`, {});
    }

    protected async openBrief(params: string): Promise<void> {
        let windowId = this.getWindowId(params);
        if (this.portal.setOnTop(windowId)) {
            return;
        }

        let item = await this.api.userGet(params);
        let config = new WindowConfig(true, false, 360);
        config.id = windowId;
        config.isExpandable = true;

        let content = null;
        /*
        this.portal.open(UserCardComponent, config);
        content.user = item;
        */
       
        content.events.pipe(
            filter(type => type === WindowEvent.EXPAND),
            takeUntil(content.destroyed)).subscribe(() => {
                this.transport.send(new UserOpenCommand({ id: params, isBriefly: false }));
                content.close();
            });
    }

    private getWindowId(params: string): string {
        return 'userOpen' + params;
    }

    private close(params: string): void {
        this.portal.close(this.getWindowId(params));
    }
}
