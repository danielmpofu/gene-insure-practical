import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NetworkService} from '../shared/services/network.service';
import {AlertifyService} from '../shared/services/alertify.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isTheSame: boolean = false;
  firstPassword: string = '';
  secondPassword: string = '';
  commentText: string = 'Fill the form to proceed';

  constructor(private appService: NetworkService,
              private  httpClient:HttpClient,
              private  alertifyService:AlertifyService,
              private  router:Router
              ) { }

  ngOnInit(): void {
  }

  doRegister(form: NgForm) {

    let url = this.appService.baseUrl + 'api/users/register';
    this.httpClient.post(url, form.value).subscribe(
      response => {
        this.alertifyService.successMessage("Account created you can now login");
        this.router.navigate(['/login']);
      },error =>{
        this.alertifyService.errorMessage("Account not created please try again");
      }
    );
  }

  comparePasswords() {
    if (this.firstPassword !== '') {
      if (this.firstPassword === this.secondPassword) {
        this.isTheSame = true;
        this.commentText = 'proceed your passwords are matching';
      } else {
        this.commentText = 'your passwords are not matching fix that to continue';
        this.isTheSame = false;
      }
    } else {
      this.commentText = 'fill the form and create a password to continue';
    }

  }

}
