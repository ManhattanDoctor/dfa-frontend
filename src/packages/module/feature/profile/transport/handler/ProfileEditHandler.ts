import { Injectable } from '@angular/core';
import { NotificationService } from '@ts-core/angular';
import { Logger, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { ProfileEditCommand, IProfileEditDto, IProfileEditDtoResponse } from '../ProfileEditCommand';
import { Client } from '@common/platform/api';
import { UserService } from '@core/service';
// import { UserSaveCommand } from '@feature/user/transport';
import { PortalService } from '@ts-core/angular-material';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ProfileEditHandler extends TransportCommandAsyncHandler<IProfileEditDto, IProfileEditDtoResponse, ProfileEditCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private portal: PortalService, private notifications: NotificationService, private user: UserService, private api: Client) {
        super(logger, transport, ProfileEditCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IProfileEditDto): Promise<IProfileEditDtoResponse> {
        /*
        let windowId = 'profileEdit' + params;
        if (this.portal.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let item = await this.api.userGet(params);
        let config = new WindowConfig(true, false, 480);
        config.id = windowId;

        let promise = PromiseHandler.create<IProfileEditDtoResponse, ExtendedError>();

        let content = this.portal.open(ProfileEditComponent, config);
        content.user = item;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case ProfileEditComponent.EVENT_SUBMITTED:
                    content.isDisabled = true;
                    try {
                        item = await this.transport.sendListen(new UserSaveCommand(content.serialize()));
                        this.notifications.info('general.save.notification');
                    }
                    finally {
                        content.isDisabled = false;
                    }

                    if (item.id === this.user.id) {
                        this.user.userUpdate(item);
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
        */
        return null;
    }
}
