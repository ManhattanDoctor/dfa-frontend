import { EntityOpenCommand, IEntityOpenDto } from "@feature/entity/transport";

export class CoinOpenCommand extends EntityOpenCommand {
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

    constructor(request: IEntityOpenDto) {
        super(request, CoinOpenCommand.NAME);
    }
}
