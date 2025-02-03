
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoreModule } from '@core/core.module';
import { RootComponent } from './component/root.component';
import { RootRoutingModule } from './root.routing.module';
import { Initializer } from './service';
import { LAZY_MODULES } from './root.lazy.modules';

//--------------------------------------------------------------------------
//
// 	Module
//
//--------------------------------------------------------------------------

@NgModule({
    declarations: [RootComponent],
    imports: [
        MatProgressBarModule,

        CoreModule.forRoot({ modules: LAZY_MODULES }),
        RootRoutingModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            deps: [Initializer],
            useFactory: (item: Initializer) => () => item.initialize(),
            multi: true
        }
    ]
})
export class RootModule { }
