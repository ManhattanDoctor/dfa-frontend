import { Component, ViewContainerRef } from '@angular/core';
import { WindowService, IWindowContent, ViewUtil } from '@ts-core/angular';
import { ISerializable } from '@ts-core/common';
import { COIN_NAME_MIN_LENGTH, COIN_NAME_MAX_LENGTH, COIN_DECIMALS_MIN, COIN_DECIMALS_MAX } from '@common/platform/coin';
import { VIMatModule } from '@ts-core/angular-material';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICoinAddDto } from '@common/platform/api/coin';
import { Client } from '@common/platform/api';
import { CoinType, CoinUtil, ICoinSeries } from '@common/hlf/coin';
import { ICoinPermission } from '@common/hlf/coin/permission';
import { ICoinData } from '@common/hlf/coin/data';
import * as _ from 'lodash';

@Component({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressBarModule,

        VIMatModule,
    ],
    selector: 'coin-add',
    templateUrl: 'coin-add.component.html',
})
export class CoinAddComponent extends IWindowContent implements ISerializable<ICoinAddDto> {
    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    public static EVENT_SUBMITTED = 'EVENT_SUBMITTED';

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public name: string;
    public type: CoinType;
    public ticker: string;
    public series: ICoinSeries;
    public decimals: number;
    public seriesUid: string;
    public seriesIndex: number;

    public types: Array<CoinType>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private windows: WindowService,
        private api: Client,
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-column scroll-vertical');

        this.type = CoinType.FT;
        this.types = Object.values(CoinType);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private getData(): ICoinData {
        return null;
    }
    private getSeries(): ICoinSeries {
        return !_.isEmpty(this.seriesUid) ? { uid: this.seriesUid, index: _.isFinite(this.seriesIndex) ? this.seriesIndex : null } : null;
    }
    private getPermissions(): Array<ICoinPermission> {
        return null;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        await this.windows.question('general.save.confirmation').yesNotPromise;
        this.emit(CoinAddComponent.EVENT_SUBMITTED);
    }

    public serialize(): ICoinAddDto {
        return {
            name: this.name,
            type: this.type,
            ticker: this.ticker,
            decimals: this.decimals,

            data: this.getData(),
            series: this.getSeries(),
            permissions: this.getPermissions(),
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get nameMinLength(): number {
        return COIN_NAME_MIN_LENGTH;
    }
    public get nameMaxLength(): number {
        return COIN_NAME_MAX_LENGTH;
    }
    public get decimalsMin(): number {
        return COIN_DECIMALS_MIN;
    }
    public get decimalsMax(): number {
        return COIN_DECIMALS_MAX;
    }
    public get tickerPattern(): RegExp {
        return CoinUtil.TICKER_REG_EXP;
    }
    public get tickerMinLength(): number {
        return CoinUtil.TICKER_MIN_LENGTH;
    }
    public get tickerMaxLength(): number {
        return CoinUtil.TICKER_MAX_LENGTH;
    }
    public get seriesUidPattern(): RegExp {
        return CoinUtil.SERIES_UID_REG_EXP;
    }
    public get seriesUidMinLength(): number {
        return CoinUtil.SERIES_UID_MIN_LENGTH;
    }
    public get seriesUidMaxLength(): number {
        return CoinUtil.SERIES_UID_MAX_LENGTH;
    }
}
