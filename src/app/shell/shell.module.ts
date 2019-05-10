import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { SharedModule } from '../shared/shared.module';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ShellRoutingModule
  ],
  declarations: [ShellComponent]
})
export class ShellModule { }
