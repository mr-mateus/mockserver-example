import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  total: number;
  constructor(private usersService: UsersService) { }

  ngOnInit() {

    this.usersService.getTotalUsers().subscribe(total => {
      this.total = total;
    });
  }

}
