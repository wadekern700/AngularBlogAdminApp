import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirective } from './sort.directive';
import { TruncPipe } from './trunc.pipe';
import { SearchPipe } from './posts-search-filter';

@NgModule({
  declarations: [SortDirective, TruncPipe, SearchPipe],
  imports: [
    CommonModule
  ],
  exports: [SortDirective, TruncPipe, SearchPipe, CommonModule]
})
export class SharedModule { }
