import { chat } from "./chat.model";

export interface Tchat {

    message: string;
    status: number;
    data: chat[];

}