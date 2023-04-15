import {GUID} from "./GUID";

export interface IRoomClose{
  roomId: GUID;
  creatorId: GUID;
  questionsId: GUID[];
}
