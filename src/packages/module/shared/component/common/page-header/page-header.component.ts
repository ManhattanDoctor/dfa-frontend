import { Component, Input, ViewContainerRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { PipeService, RouterService } from '@core/service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Component({
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    selector: 'page-header',
    templateUrl: 'page-header.component.html',
})
export class PageHeaderComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public title: string;
    private _titleId: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private pipe: PipeService, public router: RouterService) {
        super();
        ViewUtil.addClasses(container, 'd-flex flex-shrink-0 surface-container-low border-bottom align-items-center');

        pipe.language.completed.pipe(takeUntil(this.destroyed)).subscribe(() => this.commitTitleIdProperties());
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitTitleIdProperties(): void {
        let value = null;

        value = this.pipe.language.translate(this.titleId);
        if (value !== this.title) {
            this.title = value;

        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get titleId(): string {
        return this._titleId;
    }
    @Input()
    public set titleId(value: string) {
        if (value === this._titleId) {
            return;
        }
        this._titleId = value;
        this.commitTitleIdProperties();
    }

}