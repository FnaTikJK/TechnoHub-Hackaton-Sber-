import {Question} from "./Question";
import {UserOutDTO} from "./UserOutDTO";

export type RoomOutDTO = {
    name: string,
    questions: Question[],
    users: UserOutDTO[]
}
