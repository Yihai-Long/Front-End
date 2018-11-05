import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service' ;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public nav: NavService) { }

  ngOnInit() {
  }

}
