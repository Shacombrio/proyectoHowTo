import { posts } from "./posts.model";

export interface Tposts {

    message: string;
    status: number;
    data: posts[];

}