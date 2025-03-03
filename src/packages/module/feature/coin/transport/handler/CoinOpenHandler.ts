import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { EntityService, RouterService } from '@core/service';
import { CoinOpenCommand } from '../CoinOpenCommand';
import { Client } from '@common/platform/api';
import { Coin } from '@common/platform/coin';
import { EntityHandler } from '@feature/entity/transport/handler';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { EntityId } from '@feature/entity';
import { CoinContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CoinOpenHandler extends EntityHandler<Coin> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private entity: EntityService) {
        super(logger, transport, CoinOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getUrl(id: EntityId): string {
        return `${RouterService.COIN_URL}/${id}`;
    }

    protected getPrefix(): string {
        return 'coin';
    }

    protected getComponent(): ComponentType<any> {
        return CoinContainerComponent;
    }

    protected async getItem(id: EntityId): Promise<Coin> {
        if (_.isString(id)) {
            id = await this.entity.id(id);
        }
        return this.api.coinGet(id);
    }
}
