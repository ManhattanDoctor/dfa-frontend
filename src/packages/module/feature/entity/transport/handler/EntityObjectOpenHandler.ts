import { Injectable } from '@angular/core';
import { ClassType, Logger, Transport, TransportCommandHandler } from '@ts-core/common';
import { IEntityObjectOpenDto, EntityObjectOpenCommand } from '../../transport';
import { EntityObjectId } from '../../EntityObject';
import { getType, ObjectType } from '@common/hlf';
import { CoinOpenCommand } from '@feature/coin/transport';
import { CompanyOpenCommand } from '@feature/company/transport';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class EntityObjectOpenHandler extends TransportCommandHandler<IEntityObjectOpenDto, EntityObjectOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger) {
        super(logger, transport, EntityObjectOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IEntityObjectOpenDto): Promise<void> {
        let type = _.isString(params.id) ? getType(params.id) : null;
        let Command: ClassType<EntityObjectOpenCommand<EntityObjectId>> = null;

        if (type === ObjectType.COIN) {
            Command = CoinOpenCommand;
        }
        else if (type === ObjectType.USER) {
            Command = CompanyOpenCommand;
        }

        if (!_.isNil(Command)) {
            this.transport.send(new Command(params));
        }
    }
}
