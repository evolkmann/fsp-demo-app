import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecureDemoRoutingModule } from './secure-demo-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SecureDemoRoutingModule
  ]
})
export class SecureDemoModule { }
