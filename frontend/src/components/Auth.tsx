 import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignInInput,SignUpInput } from "@abhi988799/common-file"
import axios from "axios"
import { BACKEND_URL } from "../config"



export const  Auth =({type}:{type:"signup" | "signin"})=>{
    const navigate=useNavigate();
    const [postInput,setPostInput] =useState<SignUpInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try{
            const res= await  axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInput)
           
            console.log(res.data.jwt) 
            localStorage.setItem("token",res.data.jwt)
            navigate("/blogs")
        }catch(e){
            alert("req failed")
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        
        <div className="flex justify-center">
            <div >

          <div className="px-10">
             {type=="signup"?<div className="text-3xl font-extrabold ">
            Create an Account
            </div>:null} 
            <div className=" text-slate-400  ">
           {type =="signup"?"Already have an account ?":"Doesn't have an Account?"} 
           {type =="signup"?<Link className="pt-2 underline" to={"/signin"}>Login</Link>:<Link className="pt-2 underline" to={"/signup"}>Signup</Link>} 
            
            </div>
          </div>
          <div className="pt-8">
               {type=="signup"?<LabelledInput lable="name" placeholder="rohit singh" onchange={(e)=>{
                    setPostInput(c=>({
                        ...c,
                        name:e.target.value
                    })
                    )
                }}></LabelledInput>:null} 

                <LabelledInput lable="email" placeholder="rohit@gmail.com" onchange={(e)=>{
                    setPostInput(c=>({
                        ...c,
                        email:e.target.value
                    })
                    )
                }}></LabelledInput>
                <LabelledInput lable="password" type={"password"} placeholder="password" onchange={(e)=>{
                    setPostInput(c=>({
                        ...c,
                        password:e.target.value
                    })
                    )
                }}></LabelledInput>
                <button onClick={sendRequest} type="button" className="  mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> {type=="signup"?"SignUp":"SignIn"}</button>

          </div>
          </div>
        </div>
    </div>
}

interface lable{
    lable:string,
    placeholder:string,
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string


}

function LabelledInput({lable,placeholder,onchange,type}:lable){
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-semibold text-black ">{lable}</label>
            <input  onChange={onchange} type={type|| "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>

    </div>
    
}