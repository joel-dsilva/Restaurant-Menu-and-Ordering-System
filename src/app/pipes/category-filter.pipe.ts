import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {

  transform(items: MenuItem[], category: string): MenuItem[] {

    if (!category) {
      return items;
    }

    return items.filter(item => item.category === category);
  }

}