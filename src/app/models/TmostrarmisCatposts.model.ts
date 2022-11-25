import { mostrarmisCatposts } from "./mostrarmisCatposts.model";
import { posts } from "./posts.model";

export interface TmostrarmisCatposts {

    message: string;
    status: number;
    data: posts[];

}