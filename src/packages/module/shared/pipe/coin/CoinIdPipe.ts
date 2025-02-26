import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { LanguageService } from '@ts-core/frontend';
import { CoinUtil } from '@common/hlf/coin';
import * as _ from 'lodash';

@Pipe({
    name: 'coinId'
})
export class CoinIdPipe extends DestroyableContainer implements PipeTransform {

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private language: LanguageService) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(coinUid: string): string {
        let { ticker } = CoinUtil.decomposeUid(coinUid);
        return this.language.translate(`coin.coinId.${ticker}`);
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.language = null;
    }
}
