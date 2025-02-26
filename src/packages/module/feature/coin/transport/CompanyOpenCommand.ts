import { EntityObjectOpenCommand, IEntityObjectOpenDto } from "@feature/hlf/transport";

export class CompanyOpenCommand extends EntityObjectOpenCommand {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CompanyOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IEntityObjectOpenDto) {
        super(CompanyOpenCommand.NAME, request);
    }
}
