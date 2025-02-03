import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService, ThemeAssetService } from '@ts-core/frontend';
import { PipeBaseService } from '@ts-core/angular';
import { CoinAmountPipe } from '@shared/pipe';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class PipeService extends PipeBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static COIN_AMOUNT: CoinAmountPipe;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(language: LanguageService, sanitizer: DomSanitizer, private themeAsset: ThemeAssetService) {
        super(language, sanitizer);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public parseInput(item: string): string {
        return item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get coinAmount(): CoinAmountPipe {
        if (!PipeService.COIN_AMOUNT) {
            PipeService.COIN_AMOUNT = new CoinAmountPipe(this.language);
        }
        return PipeService.COIN_AMOUNT;
    }
}
