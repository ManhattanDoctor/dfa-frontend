import { Component, Input } from "@angular/core";
import { DestroyableContainer } from "@ts-core/common";
import * as _ from 'lodash';

@Component({ selector: '', template: '' })
export class UpdatableComponent<U> extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _item: U;

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitItemProperties(): void { }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected itemOpenedHandler(item: U): void { };

    protected itemClosedHandler(item: U): void { };

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.item = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get item(): U {
        return this._item;
    }
    @Input()
    public set item(value: U) {
        if (value === this._item) {
            return;
        }
        if (!_.isNil(this._item)) {
            this.itemClosedHandler(this._item);
        }
        this._item = value;
        if (!_.isNil(value)) {
            this.itemOpenedHandler(this._item);
            this.commitItemProperties();
        }
    }
}
