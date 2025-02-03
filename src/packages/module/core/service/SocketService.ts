import { Injectable } from '@angular/core';
import { DateUtil, LoadableEvent, Logger, PromiseHandler, Transport } from '@ts-core/common';
import { TransportSocket, TransportSocketClient } from '@ts-core/socket-client';
import { TransportSocketRoomCommand } from '@ts-core/socket-common';
import { SOCKET_NAMESPACE } from '@common/platform/api';
import { NotificationService } from '@ts-core/angular';
import { LoginService } from './LoginService';
import { map } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class SocketService extends TransportSocket {

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private login: LoginService, private notifications: NotificationService) {
        super(logger, { timeout: DateUtil.MILLISECONDS_MINUTE, isRestoreRoomsOnConnect: true, }, new TransportSocketClient(logger, { reconnectionAttempts: 100, namespace: SOCKET_NAMESPACE, auth: {} }));

        login.logined.subscribe(() => this.connect());
        login.logouted.subscribe(() => this.disconnect());
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
        if (this.login.isLoaded && !this.isHasDisconnectNotificationId()) {
            await this.notifications.question(this.disconnectNotificationId, null, null, { id: this.disconnectNotificationId, closeDuration: DateUtil.MILLISECONDS_HOUR }).yesNotPromise;
            this.connect();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public connect(): Promise<void> {
        this.socket.settings.auth['token'] = this.login.sid;
        return super.connect();
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
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    private get disconnectNotificationId(): string {
        return 'socket.reconnect.confirmation';
    }
}


@Injectable({ providedIn: 'root' })
export class SocketResolver implements Resolve<void> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected socket: TransportSocket) { }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        if (this.socket.socket.isLoaded) {
            return Promise.resolve();
        }
        let promise = PromiseHandler.create<void>();
        let subscription = this.socket.socket.events.subscribe(data => {
            if (data.type === LoadableEvent.COMPLETE) {
                promise.resolve();
            } else if (data.type === LoadableEvent.ERROR) {
                promise.reject(data.error.toString());
            } else if (data.type === LoadableEvent.FINISHED) {
                subscription.unsubscribe();
            }
        });
        return promise.promise;
    }
}
