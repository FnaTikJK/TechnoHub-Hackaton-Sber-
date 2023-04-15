import {IQuestion} from "./IQuestion";

export interface ICategory {
  name: string;
  questions: IQuestion[];
}
