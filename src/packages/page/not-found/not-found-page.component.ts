import { Component, ViewContainerRef } from '@angular/core';
import { RouterService } from '@core/service';
import * as _ from 'lodash';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';

@Component({
    templateUrl: './not-found-page.component.html',
    standalone: false
})
export class NotFoundPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, public router: RouterService) {
        super();
        ViewUtil.addClasses(container, 'd-block container px-3 px-lg-5 pb-3 pt-5 pb-lg-5');
    }
}
