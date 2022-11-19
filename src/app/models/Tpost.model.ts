import { post } from "./post.model";

export interface Tpost {

    message: string;
    status: number;
    data: post[];

}