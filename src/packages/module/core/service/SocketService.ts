import { Injectable } from '@angular/core';
import { DateUtil, Logger, Transport } from '@ts-core/common';
import { TransportSocket, TransportSocketClient } from '@ts-core/socket-client';
import { TransportSocketRoomCommand } from '@ts-core/socket-common';
import { SOCKET_NAMESPACE } from '@common/platform/api';
import { LoadableResolver, NotificationService } from '@ts-core/angular';
import { map, takeUntil } from 'rxjs';
import { OpenIdTokenService } from './OpenIdTokenService';
import * as _ from 'lodash';
import { LoginService } from './LoginService';

@Injectable({ providedIn: 'root' })
export class SocketService extends TransportSocket {

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, login: LoginService, private token: OpenIdTokenService, private notifications: NotificationService) {
        super(logger, { timeout: DateUtil.MILLISECONDS_MINUTE, isRestoreRoomsOnConnect: true, }, new TransportSocketClient(logger, { reconnectionAttempts: 1, namespace: SOCKET_NAMESPACE, auth: {} }));

        token.changed.pipe(takeUntil(this.destroyed)).subscribe(() => this.reconnect());
        login.logouted.pipe(takeUntil(this.destroyed)).subscribe(() => this.roomsRemove());
        transport.listen<TransportSocketRoomCommand>(TransportSocketRoomCommand.NAME).pipe(map(item => item.request)).subscribe(item => this.roomHandler(item));
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async connectedHandler(): Promise<void> {
        await super.connectedHandler();
        if (this.isHasDisconnectNotificationId()) {
            this.notifications.remove(this.disconnectNotificationId)
        }
    }

    protected async reconnectedFailedHandler(): Promise<void> {
        await super.reconnectedFailedHandler();
        if (this.token.isValid && !this.isHasDisconnectNotificationId()) {
            await this.notifications.question(this.disconnectNotificationId, null, null, { id: this.disconnectNotificationId, closeDuration: DateUtil.MILLISECONDS_HOUR }).yesNotPromise;
            this.connect();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private isHasDisconnectNotificationId(): boolean {
        return this.notifications.has(this.disconnectNotificationId);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async reconnect(): Promise<void> {
        this.disconnect();
        if (_.isNil(this.url) || !this.token.isValid) {
            return;
        }
        this.socket.settings.auth['token'] = this.token.access.value;
        return this.connect();
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    private get disconnectNotificationId(): string {
        return 'socket.reconnect.confirmation';
    }
    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get url(): string {
        return super.url;
    }
    public set url(value: string) {
        super.url = value;
        this.reconnect();
    }
}


@Injectable({ providedIn: 'root' })
export class SocketResolver extends LoadableResolver<TransportSocketClient> {
    constructor(socket: TransportSocket) {
        super(socket.socket);
    }
}
