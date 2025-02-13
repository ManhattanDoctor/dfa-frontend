import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Company } from '@common/platform/company';
import { DestroyableContainer } from '@ts-core/common';
import { CompanyPictureDirective } from '@shared/directive';
import * as _ from 'lodash';

@Component({
    imports: [CompanyPictureDirective],
    selector: 'company-picture',
    templateUrl: 'company-picture.component.html',
    styleUrl: 'company-picture.component.scss',
})
export class CompanyPictureComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public company: Company;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef) {
        super();
        ViewUtil.addClasses(container, 'd-block position-relative');
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------


    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.company = null;
    }
}
