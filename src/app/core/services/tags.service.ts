import { Injectable, EventEmitter } from '@angular/core';
import { ITag } from '../models/tag.interface';
import { TAGS_DATA } from '../data/tags.data';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tags: ITag[] = TAGS_DATA;
  onTagUpdate = new EventEmitter<{tags: ITag[]}>();

  toogleTagSelection(tagName: string) {
    const totalSelection = this.tags.reduce(
      (prev, current) => prev + (current.isSelected ? 1 : 0),
      0
    );
    const selectedSkill = this.tags.find(e => e.displayName === tagName);

    if (!selectedSkill) return;
    if (totalSelection <= 1 && selectedSkill.isSelected) return;

    selectedSkill.isSelected = !selectedSkill.isSelected;
    this.onTagUpdate.emit({
      tags: this.tags.filter(e => e.isSelected)
    });
  }
}