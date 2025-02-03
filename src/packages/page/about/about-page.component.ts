
import { Component, ElementRef } from '@angular/core';
import { EnvironmentService, RouterService } from '@core/service';
import { ViewUtil } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { SeoCommand } from '@core/transport';
import { Assets } from '@ts-core/frontend';

@Component({
    templateUrl: 'about-page.component.html',
    standalone: false
})
export class AboutPageComponent {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, transport: Transport, public router: RouterService, public environment: EnvironmentService) {
        ViewUtil.addClasses(container, 'd-block container px-3 px-lg-5 pb-3 pt-5 pb-lg-5');
        transport.send(new SeoCommand({ title: `about.title`, description: `about.description`, image: Assets.getImage(`Myth`, 'jpg') }));
    }
}
