import {ICategory} from "./ICategory";

export interface IQuestion{
  id: string;
  category: ICategory;
  title: string;
  meaning: string;
  text: string;
  image: string;
}
