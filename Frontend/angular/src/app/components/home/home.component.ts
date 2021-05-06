import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProjectsService } from 'src/app/service/projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:Product[]=[]
  constructor(private projectsService:ProjectsService) { }
  getProducts(){
    this.projectsService.getProducts().subscribe((res)=>{
      this.products = res
    })
  }
  id = this.route.snapshot.paramMap.get('id')

  ngOnInit(): void {
  this.getProducts()
  window.location.href = '/projects#'+this.id ;

  }

}
