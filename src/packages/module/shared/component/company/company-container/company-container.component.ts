import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil, IWindowContent } from '@ts-core/angular';
import { Company } from '@common/platform/company';
import { PipeService } from '@core/service';
import { CompanyPictureComponent } from '../company-picture/company-picture.component';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

@Component({
    imports: [CommonModule, CompanyPictureComponent],
    selector: 'company-container',
    templateUrl: 'company-container.component.html',
    styleUrl: 'company-container.component.scss',
})
export class CompanyContainerComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _company: Company;
    private _title: string;
    private _description: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private pipe: PipeService) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-grow-1 align-items-center justify-content-center scroll-no');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitCompanyProperties(): void {
        var value = null;

        value = this.pipe.companyName.transform(this.company);
        if (value !== this.title) {
            this.title = value;
        }

        value = this.pipe.companyDescription.transform(this.company);
        if (value !== this.description) {
            this.description = value;
        }
    }

    private commitTitleProperties(): void {
        let value = null;

        value = this.title;
        if (value !== this.title) {
            this.title = value;
        }
    }

    private commitDescriptionProperties(): void {
        let value = null;

        value = this.description;
        if (value !== this.description) {
            this.description = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public invalidate(): void {
        if (!_.isNil(this.company)) {
            this.commitCompanyProperties();
        }
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.company = null;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get company(): Company {
        return this._company;
    }
    @Input()
    public set company(value: Company) {
        if (value === this._company) {
            return;
        }
        this._company = value;
        if (!_.isNil(value)) {
            this.commitCompanyProperties();
        }
    }

    public get title(): string {
        return this._title;
    }
    @Input()
    public set title(value: string) {
        if (value === this._title) {
            return;
        }
        this._title = value;
        if (!_.isNil(value)) {
            this.commitTitleProperties();
        }
    }

    public get description(): string {
        return this._description;
    }
    @Input()
    public set description(value: string) {
        if (value === this._description) {
            return;
        }
        this._description = value;
        if (!_.isNil(value)) {
            this.commitDescriptionProperties();
        }
    }
}
