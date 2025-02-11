import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import * as _ from 'lodash';

@Directive({
    selector: '[error-picture]',
})
export class ErrorPictureDirective extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _url: string;
    protected element: HTMLImageElement;
    protected isAlreadyErrorPicture: boolean = false;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef) {
        super();
        this.element = element.nativeElement;
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected setErrorPicture = (): void => {
        if (_.isNil(this.element)) {
            return;
        }
        this.isAlreadyErrorPicture = true;
        this.element.src = this.url;
    };

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();

        this._url = null;
        this.element = null;
        this.isAlreadyErrorPicture = false;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    @Input('error-picture')
    public set url(value: string) {
        if (value === this._url) {
            return;
        }

        this._url = value;
        if (_.isNil(this.element.src)) {
            this.setErrorPicture();
        }
    }
    public get url(): string {
        return this._url;
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    @HostListener('error')
    protected errorHandler(): void {
        if (!this.isAlreadyErrorPicture) {
            this.setErrorPicture();
        }
    }
}
