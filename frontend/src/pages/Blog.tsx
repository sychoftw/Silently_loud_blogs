import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams<{ id: string }>(); 
    console.log(id)

    const { loading, blog } = useBlog({
        id: id || "" 
    });

    if (loading) {
        return <div><BlogSkeleton></BlogSkeleton></div>;
    }

    return <div>
       
    <div>
        { (blog==undefined)?"no blogs": <FullBlog blog={blog}/> }
    </div>


    </div>;
};
