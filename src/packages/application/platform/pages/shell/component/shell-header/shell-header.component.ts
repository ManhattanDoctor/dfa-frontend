import { Component, EventEmitter, ElementRef, Output, Input, booleanAttribute } from '@angular/core';
import { DestroyableContainer, Transport } from '@ts-core/common';
import { INotificationConfig, NotificationService, ViewUtil } from '@ts-core/angular';
import { RouterService, EnvironmentService } from '@core/service';
import { ScrollCommand } from '@ts-core/angular-material';

@Component({
    selector: 'shell-header',
    templateUrl: './shell-header.component.html',
    styleUrl: './shell-header.component.scss',
    standalone: false
})
export class ShellHeaderComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input({ transform: booleanAttribute })
    public isNeedSide: boolean = false;

    @Output()
    public openMenu: EventEmitter<void> = new EventEmitter();

    @Output()
    public toggleNotifications: EventEmitter<void> = new EventEmitter();

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef,
        private router: RouterService,
        private transport: Transport,
        private notifications: NotificationService,
        public environment: EnvironmentService) {
        super();
        ViewUtil.addClasses(element, 'd-flex align-items-center');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public open(): void {
        this.openMenu.emit();
    }

    public back(): void {
        this.router.navigate(RouterService.DEFAULT_URL);
        this.transport.send(new ScrollCommand());
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get notificationItems(): Array<INotificationConfig> {
        return this.notifications.closedConfigs;
    }
}
