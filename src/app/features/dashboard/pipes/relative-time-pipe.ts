import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string): string {
    const diff = Date.now() - new Date(value).getTime();

    const minutes = Math.floor(diff / 60_000);
    
    if (minutes < 1) {
      return 'just now';
    }

    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hours' : 'hours'} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`
    }

    return new Date(value).toLocaleDateString();
  }
}
