import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { AddUsersModalComponent } from '../users/add-users-modal/add-users-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private catSub: Subscription;
  modalRef: BsModalRef;
  page: string = "dashboard";
  showLogin: true;
  constructor(private headerService: HeaderService, private modalService: BsModalService, private authService: AuthService) { }

  ngOnInit() {

    this.headerService.pageEvent.subscribe((data) => {
      this.page = data;

    }
    );

  }
  onRegister() {

    this.modalRef = this.modalService.show(LoginModalComponent, {
      class: 'modal-sm', initialState: {
        title: 'Logins',
        editMode: false,
        data: {}
      }
    });



  }
}
