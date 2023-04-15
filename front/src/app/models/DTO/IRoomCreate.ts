import {GUID} from "./GUID";

export interface IRoomCreate{
  name: string;
  questionsId: GUID[];
  creatorId: GUID | null;
}
