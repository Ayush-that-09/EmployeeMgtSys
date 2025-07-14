import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewPageRoutingModule } from './preview-routing.module';

import { PreviewPage } from './preview.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [PreviewPage]
})
export class PreviewPageModule {}
