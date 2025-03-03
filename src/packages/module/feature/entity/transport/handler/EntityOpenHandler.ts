import { Injectable } from '@angular/core';
import { ClassType, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { IEntityOpenDto, EntityOpenCommand } from '../../transport';
import { CoinOpenCommand } from '@feature/coin/transport';
import { CompanyOpenCommand } from '@feature/company/transport';
import { EntityId, EntityType } from '../../Entity';
import { UserOpenCommand } from '@feature/user/transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class EntityOpenHandler extends TransportCommandHandler<IEntityOpenDto, EntityOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger) {
        super(logger, transport, EntityOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IEntityOpenDto): Promise<void> {
        let Command: ClassType<EntityOpenCommand<EntityId>> = null;

        switch (params.type) {
            case EntityType.USER:
                Command = UserOpenCommand;
                break;
            case EntityType.COIN:
                Command = CoinOpenCommand;
                break;
            case EntityType.COMPANY:
                Command = CompanyOpenCommand;
                break;
        }
        this.transport.send(new Command(params));
    }
}
