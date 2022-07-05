import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCubes, faSitemap } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome(): void{
    this.router.navigate(['/home'])
  }

  faCubes = faCubes;
  faSitemap = faSitemap;
}
