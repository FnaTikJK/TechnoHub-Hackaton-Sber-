import {GUID} from "./GUID";

export interface IDeleteRoom{
  creatorId: GUID | null;
  roomId: GUID;
}
