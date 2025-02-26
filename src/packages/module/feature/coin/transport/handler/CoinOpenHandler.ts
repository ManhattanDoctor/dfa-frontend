import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { EntityObjectService, RouterService } from '@core/service';
import { CoinOpenCommand } from '../CoinOpenCommand';
import { Client } from '@common/platform/api';
import { Coin } from '@common/platform/coin';
import { EntityObjectHandler } from '@feature/entity/transport/handler';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { EntityObjectId } from '@feature/entity';
import { CoinContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinOpenHandler extends EntityObjectHandler<Coin> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private entityObject: EntityObjectService) {
        super(logger, transport, CoinOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getUrl(id: EntityObjectId): string {
        return `${RouterService.COIN_URL}/${id}`;
    }

    protected getPrefix(): string {
        return 'coin';
    }

    protected getComponent(): ComponentType<any> {
        return CoinContainerComponent;
    }

    protected async getItem(id: EntityObjectId): Promise<Coin> {
        if (_.isString(id)) {
            id = await this.entityObject.id(id);
        }
        return this.api.coinGet(id);
    }
}
