import axios from "axios";
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";

export const Publish=()=>{
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate = useNavigate();

    return <div>
         <Appbar type="normal"></Appbar>
        <div className="flex justify-center pt-8">
       
         <div className="max-w-screen-lg w-full " >
        

        <input onChange={(e)=>{

            setTitle(e.target.value)
        }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title"/>
        <TextEditor onChange={(e)=>{

            setContent(e.target.value)
        }}></TextEditor>
        <button onClick={
          async  ()=>{
           const res=  await axios.post(`${BACKEND_URL}/api/v1/blog`,
                    {
                        title,
                        content
                    },
                    {
                        headers:{

                            Authorization:localStorage.getItem("token")
                        }
                    }
                )
                console.log("res",res.data.id.id)
                navigate(`/blog/${res.data.id.id}`)
            }
        }
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
            </div>
            
           

    </div>
    

    </div>
}




const TextEditor = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) => {
  return (
    <form>
      <div className="w-full mb-4">
        <div className="flex items-center justify-between  py-2 border-b ">
          <div className="px-4  bg-white rounded-b-lg w-full pl-2">
            <label className="sr-only">Publish post</label>
            <textarea
            onChange={onChange}
              id="editor"
              rows={8}
              className="block w-full  text-sm text-gray-800 bg-white "
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
        
      </div>
    </form>
  );
};

export default TextEditor;