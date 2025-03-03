import { ILogger, Transport, TransportCommandHandler } from '@ts-core/common';
import { RouterService } from '@core/service';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { WindowConfig } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { Entity, EntityId } from '../../Entity';
import { EntityContainerComponent } from '@shared/component';
import { EntityOpenCommand, IEntityOpenDto } from '../EntityOpenCommand';
import * as _ from 'lodash';

export abstract class EntityHandler<U extends Entity, T extends EntityId = EntityId> extends TransportCommandHandler<IEntityOpenDto<T>, EntityOpenCommand<T>> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: ILogger, transport: Transport, name: string, protected windows: WindowService, protected sheets: BottomSheetService, protected router: RouterService,) {
        super(logger, transport, name);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async execute(params: IEntityOpenDto<T>): Promise<void> {
        if (params.isBriefly) {
            await this.openObjectBrief(params.id, params.details);
        } else if (this.hasUrl(params.id)) {
            await this.open(params.id);
        }
    }

    protected async open(name: T): Promise<void> {
        let { id } = await this.getItem(name);
        this.router.navigate(this.getUrl(id));
    }

    protected async openObjectBrief<V extends EntityContainerComponent<U, K>, K = any>(id: T, details?: K): Promise<V> {
        let item = await this.getItem(id);
        let config = this.getConfig(id, item);
        let content: V = null;
        if (this.windows.setOnTop(config.id)) {
            content = this.windows.get(config.id) as V;
            content.shake();
            return content;
        }

        content = this.windows.open(this.getComponent<V>(), config);
        content.details = details;
        content.item = item;
        content.isOpenBriefly = content.isBriefly = true;

        /*
        merge(content.back, content.forward, content.backward)
            .pipe(takeUntil(content.destroyed))
            .subscribe(() => content.close());
        */

        return content;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected abstract getUrl(id: EntityId): string;

    protected abstract getItem(id: EntityId): Promise<U>;

    protected abstract getPrefix(): string;

    protected abstract getComponent<T = any>(): ComponentType<T>;

    protected getConfig(id: EntityId, item: U): WindowConfig {
        let value = new WindowConfig(false, false, 800, 500);
        value.id = `${this.getPrefix()}${item.id}`;
        value.isExpandable = this.isExpandable(id);
        return value;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected hasUrl(id: EntityId): boolean {
        return !_.isNil(this.getUrl(id));
    }

    protected isExpandable(id: EntityId): boolean {
        return this.hasUrl(id);
    }
}
