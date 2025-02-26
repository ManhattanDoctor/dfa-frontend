import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { PrettifyPipe } from '@ts-core/angular';
import { Coin } from '@common/platform/coin';
import * as _ from 'lodash';

@Pipe({
    name: 'coinName'
})
export class CoinNamePipe extends DestroyableContainer implements PipeTransform {

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(item: Coin): string {
        let value = item?.id.toString();
        return !_.isEmpty(value) ? value : PrettifyPipe.EMPTY_SYMBOL;
    }
}

