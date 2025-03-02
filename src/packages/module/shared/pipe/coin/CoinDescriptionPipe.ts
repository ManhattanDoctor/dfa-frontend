import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { Coin } from '@common/platform/coin';
import * as _ from 'lodash';

@Pipe({
    name: 'coinDescription'
})
export class CoinDescriptionPipe extends DestroyableContainer implements PipeTransform {

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(item: Coin): string {
        let { type, ticker, series } = item;
        let value = `${ticker} (${type})`;
        if (!_.isNil(series)) {
            value += `${series.uid}.${series.index}`;
        }
        return value;
    }
}

