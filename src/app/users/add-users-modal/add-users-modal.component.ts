import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from 'src/app/shared/users.service';
import { Users } from 'src/app/shared/users.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataStorageService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-add-users-modal',
  templateUrl: './add-users-modal.component.html',
  styleUrls: ['./add-users-modal.component.css']
})
export class AddUsersModalComponent implements OnInit {

  constructor(public modalRef: BsModalRef, public dataservice: DataStorageService, public usersService: UsersService, private formBuilder: FormBuilder, private authService: AuthService) { }
  userForm: FormGroup;
  user: Users;
  users: Users[];
  @Input() title: string = 'Message here...';
  @Input() editMode: boolean = false;
  ngOnInit() {

    this.initForm()
  }

  initForm() {

    console.log(this.editMode)
    let firstName = "";
    let lastName = "";
    let email = "";
    if (this.user != null) {
      firstName = this.user.firstname;
      lastName = this.user.lastname;
      email = this.user.email;
    }
    this.userForm = this.formBuilder.group({
      "FirstName": new FormControl(firstName, Validators.required),
      "LastName": new FormControl(lastName, Validators.required),
      "Email": new FormControl(email, [Validators.required, Validators.email, this.doesEmailExists.bind(this)])
    });

    if (this.editMode) {
      this.title = "Update User"
    }
    else {
      this.title = "Save User";
    }
  }
  get FirstName() {
    if (this.userForm)
      return this.userForm.get("FirstName");
  }

  get LastName() {
    if (this.userForm)
      return this.userForm.get("LastName");
  }
  get Email() {
    if (this.userForm)
      return this.userForm.get("Email");
  }


  doesEmailExists(control: FormControl) {
    console.log(control)

    if (control.value != null) {
      if (this.editMode && control.value === this.user.email) {
        return null;
      }
      if (this.usersService.doesEmailExists(control.value)) {
        return { "emailExists": true };
      }
      else {
        return null;
      }
    }
  }
  onSub() {
    console.log("in sub")
    console.log(this.userForm)
    if (this.editMode) {
      const use = new Users(this.user.id, this.FirstName.value, this.LastName.value, this.Email.value);
      this.usersService.editUser(use);
    }
    else {


      const use = new Users(null, this.FirstName.value, this.LastName.value, this.Email.value);
      this.usersService.addUser(use);

    }
    this.modalRef.hide();
  }

  close() {
    this.modalRef.hide();
  }
}
