import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginModalComponent } from './header/login-modal/login-modal.component';
import { AuthService } from 'src/app/shared/auth.service';
import { HeaderService } from './header/header.service';
import { PostService } from 'src/app/shared/posts.service';
import { DataStorageService } from 'src/app/shared/data.service';
import { CategoryService } from 'src/app/shared/category.service';
import { ModalModule } from 'ngx-bootstrap';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, LoginModalComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    LoginModalComponent
  ],
  providers: [
    AuthService, HeaderService, PostService, DataStorageService, CategoryService
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class CoreModule { }
