import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService, ViewUtil } from '@ts-core/angular';
import { ShellBaseComponent, ScrollCommand, ScrollService } from '@ts-core/angular-material';
import { EnvironmentService, RouterService, UserService } from '@core/service';
import { takeUntil } from 'rxjs';
import { ShellMenu } from './service';
import { MatSidenavContent } from '@angular/material/sidenav';
import { Transport } from '@ts-core/common';
import { MenuToggleEvent, ScrollEvent } from '@core/transport';
import { Client } from '@common/platform/api';

@Component({
    selector: 'shell-page',
    styleUrl: './shell-page.component.scss',
    templateUrl: './shell-page.component.html',
    standalone: false
})
export class ShellPageComponent extends ShellBaseComponent implements AfterViewInit {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild('container', { static: true })
    public container: MatSidenavContent;
    public isNeedScrollButton: boolean = false;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        api: Client,
        element: ElementRef,
        notifications: NotificationService,
        breakpointObserver: BreakpointObserver,
        private environment: EnvironmentService,
        private transport: Transport,
        private scroll: ScrollService,
        private router: RouterService,
        public user: UserService,
        public menu: ShellMenu
    ) {
        super(notifications, breakpointObserver);
        ViewUtil.addClasses(element, 'd-block w-100 h-100');

        router.completed.pipe(takeUntil(this.destroyed)).subscribe(this.routerCompletedHandler);
        transport.getDispatcher<MenuToggleEvent>(MenuToggleEvent.NAME).pipe(takeUntil(this.destroyed)).subscribe(() => this.toggleMenu());
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handler
    //
    //--------------------------------------------------------------------------

    private routerCompletedHandler = (): void => {
        if (!this.router.isUrlActive(this.router.previousUrl)) {
            this.scrollTop();
        }
        if (!this.isNeedSide) {
            this.isShowMenu = false;
        }
    }

    public bottomHandler(value: boolean): void {
        this.transport.dispatch(new ScrollEvent({ isBottom: value }));
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get sideMediaQueryToCheck(): string {
        return `(min-width: ${this.environment.screenLgMinWidth}px)`;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async ngAfterViewInit(): Promise<void> {
        this.initialize();
        this.scroll.container = this.container;
    }

    public scrollTop(): void {
        this.transport.send(new ScrollCommand());
    }
}
