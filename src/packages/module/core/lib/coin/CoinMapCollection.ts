
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { Coin } from '@common/platform/coin';
import { CoinAddedEvent, CoinRemovedEvent } from '@common/platform/transport';
import { TransportSocket } from '@ts-core/socket-client';
import { map, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class CoinMapCollection extends PaginableDataSourceMapCollection<Coin, Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, socket: TransportSocket) {
        super('id');
        this.sort.created = false;

        socket.getDispatcher<CoinRemovedEvent>(CoinRemovedEvent.NAME)
            .pipe(
                map(item => item.data),
                takeUntil(this.destroyed)
            ).subscribe(item => this.remove(item.toString()));
        socket.getDispatcher<CoinAddedEvent>(CoinAddedEvent.NAME)
            .pipe(
                takeUntil(this.destroyed)
            ).subscribe(() => this.reload());
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<Coin>> {
        return this.api.coinList(this.createRequestData());
    }

    protected parseItem(item: Coin): Coin {
        return TransformUtil.toClass(Coin, item);
    }
}

export class CoinTableSettings implements ICdkTableSettings<Coin> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Coin>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected pipe: PipeService) {
        this.columns = [CdkTableColumnMenu];
        this.columns.push({
            name: 'picture',
            isImage: true,
            isAsync: true,
            isDisableSort: true,
            cellStyleName: () => {
                return { width: '32px', height: '32px' };
            },
            cellClassName: 'border rounded my-2',
            format: async item => await item.picture
        })
        this.columns.push({
            name: 'name',
            headerId: 'coin.name',
            format: item => pipe.coinName.transform(item)
        });
        this.columns.push({
            name: 'status',
            headerId: 'coin.status.status',
            format: item => pipe.language.translate(`coin.status.${item.status}`)
        });
        this.columns.push({
            name: 'description',
            headerId: 'coin.description',
            isDisableSort: true,
            format: item => pipe.coinDescription.transform(item)
        });
    }
}