import { EntityObjectOpenCommand, IEntityObjectOpenDto } from "@feature/entity/transport";

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
        super(request, CompanyOpenCommand.NAME);
    }
}