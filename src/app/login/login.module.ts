import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [CoreModule],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }

export { LoginComponent } from './login.component';
