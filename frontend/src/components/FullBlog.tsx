import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{ 
    return <div>
        <Appbar type="normal"></Appbar>
<div className="flex justify-center">

    <div className="grid grid-cols-12 px-10 w-full  pt-200 max-w-screen-xl pt-12">
        <div className="col-span-8  ">
            <div className="text-5xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                posted on 2nd dec 2023
            </div>
            <div>
                {blog.content}
            </div>
        </div>
        <div className="  col-span-4">

            <div className="text-slate-500">Author</div>
            <div className="flex">
            
                <div className="pr-3 flex-col justify-center">

                <Avatar authorName="A"></Avatar>
                </div>
         <div>
            <div className="text-xl font-bold">
                {blog.authorName||"Anonymus"}

            </div>
                <div className="pt-2 text-slate-500">
          randome catch phrase about the author to abhlity to use rhe attention  
                  </div>
          </div>
            
            </div>
        </div>
        

    </div>
    
</div>
    </div>
    
} 