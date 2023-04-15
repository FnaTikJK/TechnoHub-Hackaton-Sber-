import {ICategory} from "./ICategory";

export interface IRoom{
  name: string;
  categories: ICategory[];
  membersCount: number;
}
