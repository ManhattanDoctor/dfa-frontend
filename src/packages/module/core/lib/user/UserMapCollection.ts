
import { CdkTableColumnMenu, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular-material';
import { IPagination, TransformUtil, PaginableDataSourceMapCollection } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { PipeService } from '@core/service';
import { Injectable } from '@angular/core';
import { User } from '@common/platform/user';
import { UserAddedEvent } from '@common/platform/transport';
import { takeUntil } from 'rxjs';
import { TransportSocket } from '@ts-core/socket-client';
import * as _ from 'lodash';

@Injectable()
export class UserMapCollection extends PaginableDataSourceMapCollection<User, User> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client, socket: TransportSocket) {
        super('id');
        this.sort.created = false;

        socket.getDispatcher<UserAddedEvent>(UserAddedEvent.NAME)
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

    protected request(): Promise<IPagination<User>> {
        return this.api.userList(this.createRequestData());
    }

    protected parseItem(item: User): User {
        return TransformUtil.toClass(User, item);
    }
}

export class UserTableSettings implements ICdkTableSettings<User> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<User>>;

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
            name: 'login',
            headerId: 'user.login',
            format: item => item.login
        });
        this.columns.push({
            name: 'name',
            headerId: 'user.preferences.name',
            format: item => pipe.userName.transform(item)
        });
    }
}