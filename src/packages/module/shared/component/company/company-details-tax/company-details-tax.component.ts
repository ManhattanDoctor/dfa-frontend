import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { DestroyableContainer } from '@ts-core/common';
import { VIMatModule } from '@ts-core/angular-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { CompanyTaxDetails } from '@common/platform/company';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,

        VIMatModule
    ],
    selector: 'company-details-tax',
    templateUrl: 'company-details-tax.component.html',
})
export class CompanyDetailsTaxComponent extends DestroyableContainer {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _details: CompanyTaxDetails;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef) {
        super();
        ViewUtil.addClasses(container, 'row g-0');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitDetailsProperties(): void {
        let value = null;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get details(): CompanyTaxDetails {
        return this._details;
    }
    @Input()
    public set details(value: CompanyTaxDetails) {
        if (value === this._details) {
            return;
        }
        this._details = value;
        if (!_.isNil(value)) {
            this.commitDetailsProperties();
        }
    }
}
