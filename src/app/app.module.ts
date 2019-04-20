import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostModalComponent } from './posts/add-post-modal/add-post-modal.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostResolver } from './posts/post-resolver.service';
import { SearchPipe } from './posts/posts-search-filter';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SortDirective } from './shared/sort.directive';
import { AddCategoryModalComponent } from './categories/add-category-modal/add-category-modal.component';
import { AlertModule } from 'ngx-bootstrap';
import { AddUsersModalComponent } from './users/add-users-modal/add-users-modal.component';
import { LoginModalComponent } from './header/login-modal/login-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { TruncPipe } from './shared/trunc.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    PostsComponent,
    CategoriesComponent,
    UsersComponent,
    AddPostModalComponent,
    EditPostComponent,
    SearchPipe,
    SortDirective,
    TruncPipe,
    AddUsersModalComponent,
    AddCategoryModalComponent,
    LoginModalComponent,
    HomeComponent,
    BlogComponent

  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, HttpClientModule
  ],
  providers: [PostResolver, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPostModalComponent, AddCategoryModalComponent, AddUsersModalComponent, LoginModalComponent
  ]
})
export class AppModule { }
