import { Component, ViewContainerRef } from '@angular/core';
import { EnvironmentService, RouterService } from '@core/service';
import { Transport } from '@ts-core/common';
import { MenuToggleEvent, SeoCommand } from '@core/transport';
import { ViewUtil } from '@ts-core/angular';

@Component({
    templateUrl: 'main-page.component.html',
    styleUrls: ['main-page.component.scss'],
    standalone: false
})
export class MainPageComponent {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef,
        private transport: Transport,
        public environment: EnvironmentService,
        private router: RouterService) {
        ViewUtil.addClasses(container, 'd-flex flex-column flex-grow-1 overflow-hidden');
        transport.send(new SeoCommand({ title: `general.title`, description: `general.description` }));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public menuToggle(): void {
        this.transport.dispatch(new MenuToggleEvent());
    }

    public back(): void {

    }

}
