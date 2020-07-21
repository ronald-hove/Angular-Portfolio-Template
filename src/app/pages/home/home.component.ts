import { DataApiService } from './../../services/http/data-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  skills;
  featuredProjects;
  workExperience;
  profile;

  constructor(
    public dataApi: DataApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.skills = await this.dataApi.getTopSkills();
    console.log('SKILLS', this.skills);

    this.featuredProjects = await this.dataApi.getFeaturedProjects();
    console.log('PROJECTS', this.featuredProjects);

    this.workExperience = await this.dataApi.getWorkHistory();
    console.log('WORK', this.workExperience);


    this.profile = await this.dataApi.getProfile();
    console.log('PROFILE', this.profile);

  }

}
