import { Component, Input, ViewContainerRef } from '@angular/core';
import { IWindowContent, WindowEvent } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { Entity, EntityId, EntityType } from '@feature/entity';
import { EntityOpenCommand } from '@feature/entity/transport';
import { filter, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Component({ selector: '', template: '' })
export abstract class EntityComponent<U extends Entity> extends IWindowContent {

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
            takeUntil(this.destroyed)).subscribe(() => this.open(null, null, false));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async open(item?: U, type?: EntityType, isBriefly?: boolean): Promise<void> {
        if (_.isNil(item)) {
            item = this.item;
        }
        if (_.isNil(type)) {
            type = this.type;
        }
        if (_.isNil(isBriefly)) {
            isBriefly = this.isOpenBriefly;
        }
        this.transport.send(new EntityOpenCommand({ id: item.id, type, isBriefly }));
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

    public get uid(): EntityId {
        return this.item.id;
    }

    public abstract get type(): EntityType;

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
