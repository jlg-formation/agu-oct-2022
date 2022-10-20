import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';

@NgModule({
  declarations: [StockComponent, CreateComponent],
  imports: [CommonModule, StockRoutingModule, ReactiveFormsModule],
})
export class StockModule {}
