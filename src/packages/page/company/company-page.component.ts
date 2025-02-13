import { Component, ElementRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { takeUntil } from 'rxjs'
import { Company } from '@common/platform/company';
import { ActivatedRoute } from '@angular/router';
import { PipeService } from '@core/service';
import { SeoCommand } from '@core/transport';
import { CompanyMenu } from '@feature/company/service';
import * as _ from 'lodash';

@Component({
    templateUrl: './company-page.component.html',
    standalone: false
})
export class CompanyPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _company: Company;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef, route: ActivatedRoute, private pipe: PipeService, private transport: Transport, public menu: CompanyMenu) {
        super();
        ViewUtil.addClasses(container, 'd-flex flex-column h-100');
        route.data.pipe(takeUntil(this.destroyed)).subscribe(data => this.company = data.item);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async commitCompanyProperties(): Promise<void> {
        this.transport.send(new SeoCommand({ title: this.pipe.companyName.transform(this.company), description: this.pipe.companyDescription.transform(this.company), image: this.company.preferences.picture }));
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

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get company(): Company {
        return this._company;
    }
    public set company(value: Company) {
        if (value === this._company) {
            return;
        }
        this._company = value;
        if (!_.isNil(value)) {
            this.commitCompanyProperties();
        }
    }
}