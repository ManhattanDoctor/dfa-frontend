
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { Company } from '@common/platform/company';
import { CompanyAddedEvent } from '@common/platform/transport';
import { TransportSocket } from '@ts-core/socket-client';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class CompanyMapCollection extends PaginableDataSourceMapCollection<Company, Company> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, socket: TransportSocket) {
        super('id');
        this.sort.created = false;

        socket.getDispatcher<CompanyAddedEvent>(CompanyAddedEvent.NAME)
            .pipe(
                takeUntil(this.destroyed)
            ).subscribe(() => this.reload());
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<Company>> {
        return this.api.companyList(this.createRequestData());
    }

    protected parseItem(item: Company): Company {
        return TransformUtil.toClass(Company, item);
    }
}

export class CompanyTableSettings implements ICdkTableSettings<Company> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Company>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected pipe: PipeService) {
        this.columns = [CdkTableColumnMenu];
        this.columns.push({
            name: 'picture',
            isImage: true,
            isAsync: true,
            isDisableSort: true,
            cellStyleName: () => {
                return { width: '32px', height: '32px' };
            },
            cellClassName: 'border rounded my-2',
            format: async item => await item.preferences.picture
        })
        this.columns.push({
            name: 'name',
            headerId: 'company.preferences.name',
            format: item => pipe.companyName.transform(item)
        });
        this.columns.push({
            name: 'status',
            headerId: 'company.status.status',
            format: item => pipe.language.translate(`company.status.${item.status}`)
        });
        this.columns.push({
            name: 'description',
            headerId: 'company.preferences.description',
            format: item => pipe.companyDescription.transform(item)
        });
    }
}