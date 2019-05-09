import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PostResolver } from './post-resolver.service';
import { PostsRoutingModule } from './posts-routing.module';
import { PoststartComponent } from './poststart/poststart.component';

@NgModule({
  declarations: [
    PostsComponent,
    EditPostComponent,
    PoststartComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, SharedModule, PostsRoutingModule
  ],
  providers: [PostResolver]
})
export class PostsModule { }