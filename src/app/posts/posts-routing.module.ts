import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AuthGuard } from '../shared/auth-guard.service';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostResolver } from './post-resolver.service';
import { PoststartComponent } from './poststart/poststart.component';

const postRoutes: Routes = [

    // { path: '', component: PostsComponent, canActivate: [AuthGuard] },
    // { path: 'postedit/:id', component: EditPostComponent, canActivate: [AuthGuard], resolve: { posts: PostResolver } }
    {
        path: '', component: PoststartComponent, canActivate: [AuthGuard], children: [
            { path: '', component: PostsComponent },
            { path: ':id', component: EditPostComponent, canActivate: [AuthGuard], resolve: { posts: PostResolver } }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(postRoutes)
    ],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
