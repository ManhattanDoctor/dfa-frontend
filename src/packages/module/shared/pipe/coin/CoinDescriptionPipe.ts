import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { Coin } from '@common/platform/coin';
import { PrettifyPipe } from '@ts-core/angular';
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
        let value = item?.ticker;
        return !_.isEmpty(value) ? value : PrettifyPipe.EMPTY_SYMBOL;
    }
}

