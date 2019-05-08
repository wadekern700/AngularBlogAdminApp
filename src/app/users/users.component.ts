import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../shared/users.service';
import { Users } from '../shared/users.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddUsersModalComponent } from './add-users-modal/add-users-modal.component';
import { HeaderService } from '../core/header/header.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchTitle = "firstname"
  selectedUser: Users;
  ngOnInit(): void {
    this.users = this.userService.getUsers();
    console.log(this.users);
    this.userService.userEvent.subscribe((data) => data = this.users);
    this.headerService.pageEvent.next("users");
  }
  users: Users[];
  modalRef: BsModalRef;
  constructor(private userService: UsersService, private modalService: BsModalService, private headerService: HeaderService) { }
  edit(email: string) {
    console.log(email)
    console.log("in edit")
    this.selectedUser = this.userService.getUser(email);
    this.modalRef = this.modalService.show(AddUsersModalComponent, {
      class: 'modal-lg', initialState: {
        title: 'Edit User',
        editMode: true,
        user: this.selectedUser,
        data: {}
      }
    });


  }

  delete(id: string) {
    this.userService.deleteUser(id)
  }
}
