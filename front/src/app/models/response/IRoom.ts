import {IQuestion} from "../IQuestion";

export interface IRoom {
  name: string;
  questions: IQuestion[];
}
