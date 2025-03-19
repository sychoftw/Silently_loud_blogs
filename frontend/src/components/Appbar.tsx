import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar=({type}:{type:"homepage" |"normal"})=>{
    return (
        <div className="border-b flex justify-between px-10 py-4">

            <Link to={`/blogs`}>
            <div  className="pt-4">
                <div className="flex flex-col justify-center font-bold  font-size-xl">
                    Silently Loud
                </div>
                </div>
            </Link>

        {(type=="homepage")?<div className="flex" >
            <Link to={"/signin"}>
            <div  className="pr-5">

        <button type="button" className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Signin</button>
            </div>
            </Link>
            <Link to={"/signup"}>
            <div  className="pr-5">

        <button type="button" className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Signup</button>
            </div>
            </Link>
            
        </div>
        :
            <div className="flex" >
            <Link to={"/publish"}>
            <div  className="pr-5">

        <button type="button" className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Add Blog</button>
            </div>
            </Link>
            <div>
            <Avatar authorName="rohit" ></Avatar>
            </div>
        </div>

            }  
            
        </div>
    )
}