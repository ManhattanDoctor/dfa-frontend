import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { FinancePipe, PrettifyPipe } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { Coin, ICoinAmount, CoinUtil as CoinUtilBase } from '@hlf-core/coin';
import { Action, } from '@common/platform';
import { CoinUtil } from '@common/hlf/coin';
import { CoinBalance } from '@common/platform/coin';
import { CoinIdPipe } from './CoinIdPipe';
import * as _ from 'lodash';

@Pipe({
    name: 'coinAmount'
})
export class CoinAmountPipe extends DestroyableContainer implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    private coinId: CoinIdPipe;
    private finance: FinancePipe;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService) {
        super();
        this.coinId = new CoinIdPipe(language);
        this.finance = new FinancePipe();
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(amount: string, coin: CoinType, isNeedCoinId: boolean = true): string {
        if (_.isNil(amount) || _.isNil(coin)) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        let coinUid = !_.isNil(coin['coinUid']) ? coin['coinUid'] : coin['uid'];
        let { decimals } = CoinUtil.decomposeUid(coinUid);
        let value = this.finance.transform(CoinUtilBase.fromCent(amount, decimals), '0,0.[000000000000000000]');
        return !isNeedCoinId ? value : `${value} ${this.coinId.transform(coinUid)}`;
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        if (!_.isNil(this.coinId)) {
            this.coinId.destroy();
            this.coinId = null;
        }
        this.finance = null;
    }
}

export type CoinType = ICoinAmount | Coin | CoinBalance | Action;