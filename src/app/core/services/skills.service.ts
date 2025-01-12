import { Injectable } from '@angular/core';
import { ISkill } from '../models/skill.interface';
import { SKILLS_DATA } from '../data/skills.data';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  getSkills(): ISkill[] {
    return SKILLS_DATA;
  }
}