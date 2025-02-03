import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer, MathUtil } from '@ts-core/common';
import { FinancePipe, PrettifyPipe } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend';
import { CoinUtil } from '@common/hlf/coin';
import * as _ from 'lodash';

@Pipe({
    name: 'coinAmount',
    standalone: false
})
export class CoinAmountPipe extends DestroyableContainer implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    private finance: FinancePipe;
    private language: LanguageService;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService) {
        super();
        this.finance = new FinancePipe();
        this.language = language;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(item: string, isNeedCoinId: boolean = true): string {
        if (_.isNil(item) || item === PrettifyPipe.EMPTY_SYMBOL) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        /*
        let amount = _.isString(item) ? item : item.amount;
        let coinId = _.isString(item) ? CoinId.RUB : item.coinId;
        let decimals = CoinUtil.getDecimals(coinId);
        amount = CoinUtil.fromCent(amount, coinId);
        let value = this.finance.transform(amount, `0,0.[${'0'.repeat(decimals)}]`);
        if (isNeedCoinId) {
            value += ` ${this.language.translate(`coin.coinId.${coinId}PluralHidden`, { amount: MathUtil.floor(amount) })}`;
        }
        return value;
        */
        return null;
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.finance = null;
    }
}
