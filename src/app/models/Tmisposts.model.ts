import { mostrarmisposts} from "./misposts.model";
import { posts } from "./posts.model";

export interface Tmisposts{

    message: string;
    status: number;
    data: posts[];

}