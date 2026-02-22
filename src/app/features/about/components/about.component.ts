import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISkill } from '../../../core/models/skill.interface';
import { SkillsService } from '../../../core/services/skills.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: false
})
export class AboutComponent implements OnInit {
  skills!: ISkill[];
  
  constructor(
    private skillsService: SkillsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.skills = this.skillsService.getSkills();
  }

  onBackClick() {
    this.router.navigateByUrl('/');
  }
}