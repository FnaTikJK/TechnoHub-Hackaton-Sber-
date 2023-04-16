import {Category} from "./Category";
import {Room} from "./Room";

export type Question = {
    category: Category,
    title: string,
    meaning: string,
    text: string,
    image: number[] | null,
    rooms: Room[]
}
