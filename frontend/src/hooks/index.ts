import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export interface Blog {
  id:string
  title: string;
  content: string;
  authorName: string;
  publishDate?: string; // Optional if not provided by backend
}

export const useBlog=({id}:{id:String})=>{
  console.log("inside hook",id)
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
   const result= axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        
        const formattedBlogs =  {
          id:res.data.blog.id,
          title: res.data.blog.title,
          content: res.data.blog.content,
          authorName: res.data.blog.name,
          publishDate: res.data.blog.publishDate || "Unknown Date",

        };
       
        
        console.log(formattedBlogs)
        setBlog(formattedBlogs);

        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors properly
  }, []);

  return {
    loading,
    blog,
  };
}


export const useBlogs = () => {

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]); // ✅ Correct type

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        const formattedBlogs = res.data.blogs.map((blog: any) => ({
            id:blog.id,
          title: blog.title,
          content: blog.content,
          authorName: blog.author.name, // ✅ Fix mapping from backend
          publishDate: blog.publishDate || "Unknown Date",
        }));

        setBlogs(formattedBlogs);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors properly
  }, []);

  return {
    loading,
    blogs,
  };
};
