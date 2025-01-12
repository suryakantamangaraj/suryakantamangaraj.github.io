import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noEmoji'
})
export class NoEmojiPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, 
      ''
    );
  }
}