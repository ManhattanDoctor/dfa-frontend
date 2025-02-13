import { Directive, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { Company } from '@common/platform/company';
import { Platform } from '@angular/cdk/platform';
import { ViewUtil } from '@ts-core/angular';
import { ThemeAssetService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Directive({
    selector: '[company-picture]',
})
export class CompanyPictureDirective extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    //	Private
    //
    // --------------------------------------------------------------------------

    private _company: Company;
    private _picture: string;

    private element: HTMLDivElement;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(platform: Platform, element: ElementRef<HTMLDivElement>, private themeAsset: ThemeAssetService) {
        super();
        this.element = element.nativeElement;
        ViewUtil.addClass(this.element, 'overflow-hidden');
        ViewUtil.setStyle(this.element, 'background-size', 'contain');
        ViewUtil.setStyle(this.element, 'background-position', 'center');
        if (platform.SAFARI) {
            ViewUtil.setStyle(this.element, 'transform', 'translate3d(0,0,0)');
        }
    }

    // --------------------------------------------------------------------------
    //
    //	Private Properties
    //
    // --------------------------------------------------------------------------

    private invalidateMedia(): void {
        if (_.isNil(this.company)) {
            return;
        }
        this.picture = this.getPicture();
    }

    private commitPictureProperties(): void {
        ViewUtil.setBackground(this.element, this.picture, 'no-repeat', this.themeAsset.getIcon('256'));
    }

    private getPicture(): string {
        return this.company.preferences.picture;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        this.company = null;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Properties
    //
    // --------------------------------------------------------------------------

    public get company(): Company {
        return this._company;
    }
    @Input('company-picture')
    public set company(value: Company) {
        if (value === this._company) {
            return;
        }
        this._company = value;
        if (!_.isNil(value)) {
            this.invalidateMedia();
        }
    }

    public get picture(): string {
        return this._picture;
    }
    @Input()
    public set picture(value: string) {
        if (value === this._picture) {
            return;
        }
        this._picture = value;
        this.commitPictureProperties();
    }
}
