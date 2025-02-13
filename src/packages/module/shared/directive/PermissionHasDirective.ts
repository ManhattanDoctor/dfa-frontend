import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@core/service';
import { StructureDirective } from '@ts-core/angular';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Directive({
    selector: '[permissionHas]'
})
export class PermissionHasDirective<T = any> extends StructureDirective<T> {
    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    protected _permissionHas: string;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        template: TemplateRef<T>,
        container: ViewContainerRef,
        protected service: PermissionService
    ) {
        super(template, container);
        service.completed.pipe(takeUntil(this.destroyed)).subscribe(() => this.check());
    }

    // --------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected check(): void {
        this.isNeedAdd = !_.isNil(this.permissionHas) && this.service.hasResourceScope(this.permissionHas);
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

        super.destroy();
        this.service = null;
        this._permissionHas = null;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Properties
    //
    // --------------------------------------------------------------------------

    @Input('permissionHas')
    public set permissionHas(value: string) {
        if (value === this._permissionHas) {
            return;
        }
        this._permissionHas = value;
        this.check();
    }
    public get permissionHas(): string {
        return this._permissionHas;
    }
}
