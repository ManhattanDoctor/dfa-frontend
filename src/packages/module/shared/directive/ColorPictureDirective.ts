import { Directive, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { Platform } from '@angular/cdk/platform';
import { ViewUtil } from '@ts-core/angular';
import { ThemeService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Directive({
    selector: '[color-picture]',
    standalone: false
})
export class ColorPictureDirective extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    //	Private
    //
    // --------------------------------------------------------------------------

    private _color: string = null;
    private _picture: string = null;

    private element: HTMLDivElement;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(platform: Platform, element: ElementRef<HTMLDivElement>, private theme: ThemeService) {
        super();
        this.element = element.nativeElement;
        ViewUtil.addClasses(this.element, 'overflow-hidden rounded-circle');
        ViewUtil.setStyle(this.element, 'background-size', 'contain');
        ViewUtil.setStyle(this.element, 'background-position', 'center');
        ViewUtil.setStyle(this.element, 'border-width', '2px');
        ViewUtil.setStyle(this.element, 'border-style', 'solid');
        ViewUtil.setStyle(this.element, 'width', '40px');
        ViewUtil.setStyle(this.element, 'height', '40px');

        if (platform.SAFARI) {
            ViewUtil.setStyle(this.element, 'transform', 'translate3d(0,0,0)');
        }
    }

    // --------------------------------------------------------------------------
    //
    //	Private Properties
    //
    // --------------------------------------------------------------------------

    private commitColorProperties(): void {
        ViewUtil.setStyle(this.element, 'border-color', this.theme.getStyle(`color-${this.color}`));
    }

    private commitPictureProperties(): void {
        ViewUtil.setProperty(this.element, 'src', this.picture);
    }

    // --------------------------------------------------------------------------
    //
    //	Public Properties
    //
    // --------------------------------------------------------------------------

    public get color(): string {
        return this._color;
    }
    @Input()
    public set color(value: string) {
        if (value === this._color) {
            return;
        }
        this._color = value;
        this.commitColorProperties();
    }

    public get picture(): string {
        return this._picture;
    }
    @Input('color-picture')
    public set picture(value: string) {
        if (value === this._picture) {
            return;
        }
        this._picture = value;
        this.commitPictureProperties();
    }
}
