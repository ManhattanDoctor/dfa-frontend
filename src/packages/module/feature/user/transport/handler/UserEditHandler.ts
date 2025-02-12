import { Injectable } from '@angular/core';
import { NotificationService, WindowClosedError, WindowConfig, WindowEvent } from '@ts-core/angular';
import { ExtendedError, Logger, PromiseHandler, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { UserEditCommand, IUserEditDtoResponse } from '../UserEditCommand';
import { Client } from '@common/platform/api';
import { UserService } from '@core/service';
import { UserSaveCommand } from '@feature/user/transport';
import { PortalService } from '@ts-core/angular-material';
import { takeUntil } from 'rxjs';
import { UserEditComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserEditHandler extends TransportCommandAsyncHandler<string, IUserEditDtoResponse, UserEditCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private user: UserService, private api: Client) {
        super(logger, transport, UserEditCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: string): Promise<IUserEditDtoResponse> {
        let windowId = 'UserEdit' + params;
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let item = await this.api.userGet(params);
        let config = new WindowConfig(true, false, 480);
        config.id = windowId;

        let promise = PromiseHandler.create<IUserEditDtoResponse, ExtendedError>();

        let content = this.portal.open(UserEditComponent, config);
        content.user = item;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case UserEditComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        item = await this.transport.sendListen(new UserSaveCommand(content.serialize()));
                        this.notifications.info('general.save.notification');
                    }
                    finally {
                        content.isDisabled = false;
                    }

                    if (item.id === this.user.id) {
                        this.user.update(item);
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
