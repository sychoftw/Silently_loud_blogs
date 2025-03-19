import { Link, } from "react-router-dom";


interface BlogCardProps{
    id:string
    authorName:string,
    title:string,
    content:string,
    publishDate:string
}
export  const BlogCard=(
    {authorName,
    title,
    content,
    publishDate,
id}:BlogCardProps)=>{
    return<Link to={`/blog/${id}`}replace>

    
     <div className=" p-4 border-b  pt-4 border-slate-200 pb-4 w-screen max-w-screen-md curser-pointer">
        <div className="flex">
            
           <Avatar authorName={authorName}></Avatar> 

            
           <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
           {authorName}

           </div>
           <div className=" flex justify-center flex-col text-xs flex justify-center flex-col pl-2">
            &#9679;
           </div>
           <div className=" flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
           {publishDate}

           </div>
           
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin " >
            {content.slice(0,100)+"....."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)}minute(s)`}
        </div>
       

    </div>
    </Link>
}
interface AvatarInterface{
    authorName:string;
}
export function Avatar({authorName}:AvatarInterface){
    return <div>
        
<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="text-xs text-gray-600 dark:text-gray-300">{authorName[0]}</span>
</div>

    </div>
    
}


 