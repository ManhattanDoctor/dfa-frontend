import { EntityOpenCommand, IEntityOpenDto } from "@feature/entity/transport";

export class CompanyOpenCommand extends EntityOpenCommand {
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

    constructor(request: IEntityOpenDto) {
        super(request, CompanyOpenCommand.NAME);
    }
}