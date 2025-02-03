import { Directive, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { LanguageService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Directive({
    selector: '[seo-link]',
    standalone: false
})
export class SeoLinkDirective extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    //	Private
    //
    // --------------------------------------------------------------------------

    private _link: string;
    private _title: string;

    private element: HTMLAnchorElement;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef<HTMLAnchorElement>, private language: LanguageService) {
        super();
        this.element = element.nativeElement;
    }

    // --------------------------------------------------------------------------
    //
    //	Private Properties
    //
    // --------------------------------------------------------------------------

    private commitLinkProperties(): void {
        this.element.href = this.link;
    }

    private commitTitleProperties(): void {
        this.element.innerHTML = this.title;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Properties
    //
    // --------------------------------------------------------------------------

    public get link(): string {
        return this._link;
    }
    @Input('seo-link')
    public set link(value: string) {
        if (value === this._link) {
            return;
        }
        this._link = value;
        if (!_.isNil(value)) {
            this.commitLinkProperties();
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

    @Input()
    public set titleId(value: string) {
        this.title = this.language.translate(value);
    }
}
