import { mostrarfav } from "./mostrarfav.model";
import { posts } from "./posts.model";

export interface Tmostrarfav {

    message: string;
    status: number;
    data: posts[];

}