import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostResolver } from './posts/post-resolver.service';
import { HomeComponent } from './core/home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
  { path: 'posts:id', loadChildren: './posts/posts.module#PostsModule' },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
