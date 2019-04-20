import { Component, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../shared/post.model';
import { Subscribable, Subscription } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AddPostModalComponent } from '../posts/add-post-modal/add-post-modal.component';
import { AddCategoryModalComponent } from '../categories/add-category-modal/add-category-modal.component';
import { AddUsersModalComponent } from '../users/add-users-modal/add-users-modal.component';
import { UsersService } from '../shared/users.service';
import { DataStorageService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { PostService } from '../shared/posts.service';
import { CategoryService } from '../shared/category.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.catSub.unsubscribe();
  }

  constructor(private postService: PostService, private authService: AuthService, private dataService: DataStorageService, private modalService: BsModalService, private categoryService: CategoryService, private userService: UsersService) { }
  posts: Posts[];
  categoryCount;
  postCount;
  userCount;
  private sub: Subscription;
  private catSub: Subscription;
  modalRef: BsModalRef;
  ngOnInit() {

    this.posts = this.postService.getPosts();
    if (this.posts != null) {
      this.postCount = this.posts.length;
    }
    this.sub = this.postService.getPostEvent().subscribe((list: Posts[]) => { this.posts = list; console.log(list); this.postCount = list.length });


    if (this.categoryService.getCategories() != null) {
      this.categoryCount = this.categoryService.getCategories().length;
    }
    this.catSub = this.categoryService.getCategoryEvent().subscribe((data => this.categoryCount = data.length));

    if (this.userService.getUsers() != null) {
      this.userCount = this.userService.getUsers().length;
    }
    this.userService.userEvent.subscribe((data => this.userCount = data.length));

  }

  openFormModal() {
    this.modalRef = this.modalService.show(AddPostModalComponent, {
      initialState: {
        title: 'Modal title',
        data: {
          "name":
            "test"
        }
      }
    });
  }

  openCategoryModal() {
    console.log(this.categoryService)
    this.modalRef = this.modalService.show(AddCategoryModalComponent, {
      initialState: {
        title: 'Modal title',
        data: {}
      }
    });
  }

  openUsersModal() {

    console.log(this.userService)

    this.modalRef = this.modalService.show(AddUsersModalComponent, {
      class: 'modal-lg', initialState: {
        title: 'Add User',
        editMode: false,
        data: {}
      }
    });


  }


}
