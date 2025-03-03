import { Injectable } from '@angular/core';
import { DateUtil, Logger, Transport } from '@ts-core/common';
import { TransportSocket, TransportSocketClient } from '@ts-core/socket-client';
import { TransportSocketRoomCommand } from '@ts-core/socket-common';
import { SOCKET_NAMESPACE } from '@common/platform/api';
import { LoadableResolver, WindowConfig, WindowService } from '@ts-core/angular';
import { map, takeUntil } from 'rxjs';
import { OpenIdTokenService } from './OpenIdTokenService';
import { LoginService } from './LoginService';
import { SocketReconnectComponent } from '@shared/component';
import * as _ from 'lodash';
import { PortalService } from '@ts-core/angular-material';

@Injectable({ providedIn: 'root' })
export class SocketService extends TransportSocket {

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, login: LoginService, private token: OpenIdTokenService, private portal: PortalService) {
        super(logger, { timeout: DateUtil.MILLISECONDS_MINUTE, isRestoreRoomsOnConnect: true, }, new TransportSocketClient(logger, { reconnectionAttempts: DateUtil.MILLISECONDS_YEAR, namespace: SOCKET_NAMESPACE, auth: {} }));

        token.changed.pipe(takeUntil(this.destroyed)).subscribe(() => this.reconnect());
        login.logouted.pipe(takeUntil(this.destroyed)).subscribe(() => this.roomsRemove());
        transport.listen<TransportSocketRoomCommand>(TransportSocketRoomCommand.NAME).pipe(takeUntil(this.destroyed), map(item => item.request)).subscribe(item => this.roomHandler(item));
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async connectedHandler(): Promise<void> {
        await super.connectedHandler();
        this.closeNotification();
        console.log('connectedHandler');
    }

    protected async disconnectedHandler(): Promise<void> {
        await super.disconnectedHandler();
        this.openNotification();
        console.log('disconnectedHandler');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private async openNotification(): Promise<void> {
        let config = new WindowConfig(true, false, 480);
        config.id = this.disconnectNotificationId;
        config.isDisableClose = true;
        this.portal.open(SocketReconnectComponent, config);
    }

    private async closeNotification(): Promise<void> {
        this.portal.close(this.disconnectNotificationId)
    }

    private isHasDisconnectNotification(): boolean {
        return this.portal.has(this.disconnectNotificationId);
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
