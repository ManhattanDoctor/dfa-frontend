import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { NativeWindowService } from '@ts-core/frontend';
import { SettingsService } from '@core/service';
import { HlfTransactionOpenCommand } from '../../transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class HlfTransactionOpenHandler extends TransportCommandHandler<string, HlfTransactionOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private nativeWindow: NativeWindowService, private settings: SettingsService) {
        super(logger, transport, HlfTransactionOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: string): Promise<void> {
        // this.nativeWindow.open(`${this.settings.ledgerExplorerUrl}transaction/${params}`);
    }
}
