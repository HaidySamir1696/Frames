import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.getProjects()
  }

}
