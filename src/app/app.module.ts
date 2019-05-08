import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryModalComponent } from './categories/add-category-modal/add-category-modal.component';
import { AlertModule } from 'ngx-bootstrap';
import { AddUsersModalComponent } from './users/add-users-modal/add-users-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { BlogComponent } from './blog/blog.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AddPostModalComponent } from './posts/add-post-modal/add-post-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoriesComponent,
    UsersComponent,
    AddUsersModalComponent,
    AddCategoryModalComponent,
    BlogComponent,
    AddPostModalComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPostModalComponent, AddCategoryModalComponent, AddUsersModalComponent
  ]
})
export class AppModule { }
