import { ILogger, Transport, TransportCommandHandler } from '@ts-core/common';
import { RouterService } from '@core/service';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { WindowConfig } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { IEntityObjectOpenDto, EntityObjectOpenCommand } from '@feature/hlf/transport';
import { takeUntil, merge } from 'rxjs';
import { EntityObject, EntityObjectId } from '../../EntityObject';
import { EntityObjectContainerComponent } from '@shared/component';
import * as _ from 'lodash';

export abstract class EntityObjectOpenHandler<U extends EntityObject, T extends EntityObjectId = EntityObjectId> extends TransportCommandHandler<IEntityObjectOpenDto<T>, EntityObjectOpenCommand<T>> {
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

    protected async execute(params: IEntityObjectOpenDto<T>): Promise<void> {
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

    protected async openObjectBrief<V extends EntityObjectContainerComponent<U, K>, K = any>(id: T, details?: K): Promise<V> {
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

    protected abstract getItem(id: EntityObjectId): Promise<U>;

    protected abstract getComponent<T = any>(): ComponentType<T>;

    protected getConfig(id: EntityObjectId, item: U): WindowConfig {
        let value = new WindowConfig(false, false, 800, 500);
        value.id = item.id.toString();
        value.isExpandable = this.isExpandable(id);
        return value;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected getUrl(id: EntityObjectId): string {
        return null;
    }

    protected hasUrl(id: EntityObjectId): boolean {
        return !_.isNil(this.getUrl(id));
    }

    protected isExpandable(id: EntityObjectId): boolean {
        return this.hasUrl(id);
    }
}
