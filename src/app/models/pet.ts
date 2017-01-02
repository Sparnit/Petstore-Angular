import { Category } from './category';
import { Tag } from './tag';

export class Pet {
  id: number;
  name: string;
  category: Category;
  photoUrls: string[];
  tags: Tag[];
  status: string;
}