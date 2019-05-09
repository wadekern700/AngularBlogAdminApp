import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data.service';
@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private dataStorage: DataStorageService) { }
    users: Users[] = [];
    userEvent = new Subject<Users[]>();

    getUsers() {
        if (this.users.length == 0) {
            console.log("in get users null")
            this.dataStorage.getUsers().subscribe(
                e => {
                    console.log("Retrieving Users Was A success");
                    this.users = e;
                    this.userEvent.next(this.users.slice())
                },
                x => console.log("Retrieving Users caused an error " + x)
            );
        }
        else {
            return this.users;
        }
    }

    doesEmailExists(email: string): boolean {
        if (this.users == null) {
            return false;
        }
        const number = this.users.findIndex(x => x.email === email);
        if (+number === -1)
            return false;
        else
            return true;
    }
    addUser(User: Users) {

        this.dataStorage.storeUsers(User).subscribe(
            ((e) => {
                console.log("Adding Users Was A success");
                console.log(e);
                User = e;
                this.users.push(User);
                this.userEvent.next(this.users.slice())
            }),
            x => console.log(x)
        );
    }


    getUser(id: string) {

        return this.users.find(x => x.id === id);
    }
    editUser(User: Users) {

        const number = this.users.findIndex(x => x.id === User.id);
        this.users[number].email = User.email;
        this.users[number].firstname = User.firstname;
        this.users[number].lastname = User.lastname;
        this.userEvent.next(this.users.slice());

        this.dataStorage.updateUsers(User).subscribe(
            e => console.log("Updating Users Was A success"),
            x => console.log("Updating Users caused an error " + x)
        );

    }
    deleteUser(id: string) {

        const number = this.users.findIndex(x => x.id === id);
        this.users.splice(number, 1);
        this.dataStorage.deleteUsers(id);
    }
}