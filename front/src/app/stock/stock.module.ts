import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateComponent } from './create/create.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [StockComponent, CreateComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    WidgetModule,
  ],
})
export class StockModule {}
