import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageUrl: string;
  firstName: string;
  surname: string;
  email: string;
  id: string;
  userId: number;

  ngOnInit(): void {
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['login']);
    } else {
      this.imageUrl = localStorage.getItem('picurl');
      this.firstName = localStorage.getItem('firstName');
      this.surname = localStorage.getItem('surname');
      this.email = localStorage.getItem('email');
      this.id = localStorage.getItem('nationalId');
      this.userId = +localStorage.getItem('userId');
    }
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }


  constructor(private router: Router) {
  }


}
