import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/service/projects.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  
  //constructor() { }
  products:Product[]=[]
  constructor(private projectsService:ProjectsService) { }
  getProducts(){
    this.projectsService.getProducts().subscribe((res)=>{
      this.products = res
    })
  }
  ngOnInit(): void {
  this.getProducts()
  }
  title = 'ng-carousel-demo';
  delete(id:any){
    this.projectsService.deleteProduct(id).subscribe((res)=>{
   
      console.log(res);
    });
  }
  slides = [
    {img: "https://dummyimage.com/350x150/423b42/fff"},
    {img: "https://dummyimage.com/350x150/2a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/1a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/7a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/9a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/5a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/4a2b7a/fff"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
    
  breakpoint(e:any) {
    console.log('breakpoint');
  }
    
  afterChange(e:any) {
    console.log('afterChange');
  }
    
  beforeChange(e:any) {
    console.log('beforeChange');}

}
