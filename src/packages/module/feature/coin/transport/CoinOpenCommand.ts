import { EntityObjectOpenCommand, IEntityObjectOpenDto } from "@feature/entity/transport";

export class CoinOpenCommand extends EntityObjectOpenCommand {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IEntityObjectOpenDto) {
        super(request, CoinOpenCommand.NAME);
    }
}
