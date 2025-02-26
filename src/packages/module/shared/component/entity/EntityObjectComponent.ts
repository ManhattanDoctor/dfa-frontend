import { Component, Input, ViewContainerRef } from '@angular/core';
import { IWindowContent, WindowEvent } from '@ts-core/angular';
import { Transport, ITransport } from '@ts-core/common';
import { EntityObject, EntityObjectId } from '@feature/entity';
import { EntityObjectOpenCommand } from '@feature/entity/transport';
import { filter, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Component({ selector: '', template: '' })
export class EntityObjectComponent<U extends EntityObject> extends IWindowContent {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _item: U;
    protected _isBriefly: boolean;

    @Input()
    public isOpenBriefly: boolean = false;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, protected transport: Transport) {
        super(container);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitItemProperties(): void { }

    protected commitIsBrieflyProperties(): void { }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected itemOpenedHandler(item: U): void { };

    protected itemClosedHandler(item: U): void { };

    protected commitWindowProperties(): void {
        super.commitWindowProperties();
        this.events.pipe(
            filter(item => item === WindowEvent.EXPAND),
            takeUntil(this.destroyed)).subscribe(() => this.open(this.item, false));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async open(item?: U, isBriefly?: boolean): Promise<void> {
        if (_.isNil(item)) {
            item = this.item;
        }
        if (_.isNil(isBriefly)) {
            isBriefly = this.isOpenBriefly;
        }
        this.transport.send(new EntityObjectOpenCommand(EntityObjectOpenCommand.NAME, { id: item.id, isBriefly }));
        if (this.isBriefly) {
            this.close();
        }
    }

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

    public get uid(): EntityObjectId {
        return this.item.id;
    }

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

    public get isBriefly(): boolean {
        return this._isBriefly;
    }
    @Input()
    public set isBriefly(value: boolean) {
        if (value === this._isBriefly) {
            return;
        }
        this._isBriefly = value;
        if (!_.isNil(value)) {
            this.commitIsBrieflyProperties();
        }
    }
}
