import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/service/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
projects:Project[]=[]
  constructor(private projectsService:ProjectsService) { }
  getProjects(){
    this.projectsService.getProjects().subscribe((res)=>{
      this.projects = res
    })
  }
  products:Product[]=[]
  getProducts(){
    this.projectsService.getProducts().subscribe((res)=>{
      this.products = res
    })
  }
  
  id = this.route.snapshot.paramMap.get('id')


  ngOnInit(): void {
    this.getProjects()
    this.getProducts()
    //this.router.navigate(['/projects#'+this.id])
    console.log(this.id)

    window.location.href = '/projects#'+this.id ;
  }

}
