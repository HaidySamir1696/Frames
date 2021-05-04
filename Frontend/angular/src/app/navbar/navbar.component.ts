import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProjectsService } from '../service/projects.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private projectsService:ProjectsService) { }
 
  products:Product[]=[]
  getProducts(){
    this.projectsService.getProducts().subscribe((res)=>{
      this.products = res
    })
  }
  ngOnInit(): void {
    this.getProducts()
  }

}
