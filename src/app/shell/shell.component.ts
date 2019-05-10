import { Component, OnInit } from '@angular/core';
import { ThfMenuItem } from '@totvs/thf-ui';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/home' },
    { label: 'Users', link: '/users' },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
