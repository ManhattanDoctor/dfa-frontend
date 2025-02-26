import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems, ViewUtil } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { ObjectUtil, Transport } from '@ts-core/common';
import { MenuTriggerForDirective, VIMatModule } from '@ts-core/angular-material';
import { ActionsComponent, UserDetailsComponent, UserPictureComponent, EntityObjectComponent } from '@shared/component';
import { TransportSocket } from '@ts-core/socket-client';
import { User } from '@common/platform/user';
import { UserMenu } from '@core/lib/user';
import { getSocketUserRoom } from '@common/platform';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { UserChangedEvent } from '@common/platform/transport';
import { filter, map, takeUntil } from 'rxjs';
import { UserNamePipe } from '@shared/pipe/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        VIMatModule,
        ActionsComponent,
        UserNamePipe,
        UserPictureComponent, 
        UserDetailsComponent,
    ],
    selector: 'user-container',
    templateUrl: 'user-container.component.html'
})
export class UserContainerComponent extends EntityObjectComponent<User> {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public tabs: SelectListItems<ISelectListItem<string>>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        transport: Transport,
        language: LanguageService,
        private socket: TransportSocket,
        public menu: UserMenu,
    ) {
        super(container, transport);
        ViewUtil.addClasses(container, 'd-flex flex-column');

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('user.user', 0, 'USER'));
        this.tabs.add(new SelectListItem('action.actions', 1, 'ACTIONS'));
        this.tabs.complete(0);

        socket.getDispatcher<UserChangedEvent>(UserChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                filter(item => item.id === this.item.id),
                takeUntil(this.destroyed)
            ).subscribe(item => ObjectUtil.copyPartial(item, this.item));
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected itemOpenedHandler(item: User): void {
        this.socket.roomAdd(getSocketUserRoom(item.id));
    }

    protected itemClosedHandler(item: User): void {
        this.socket.roomRemove(getSocketUserRoom(item.id));
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async menuOpen(event: MouseEvent): Promise<void> {
        this.menu.refresh(this.item);
        this.trigger.openMenuOn(event.target);
    }
}
