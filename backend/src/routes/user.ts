import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,verify,sign} from 'hono/jwt'
import {signUpInput,signInInput} from '@abhi988799/common-file'




export const userRouter =new Hono<{
    Bindings:{
      DATABASE_URL :string,
      JWT_SECRET:string
    }
  }>()



userRouter.post('/signup',async (c) => {
    const body =await c.req.json();
    const {success}=signUpInput.safeParse(body)
    if(!success){
      return c.json({
        msg:"invalid data"
      })
    }
    const prisma = new PrismaClient({
      
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
  try{
    const user=  await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name
      }
  
    })
     
    const token =await sign({id: user.id},c.env.JWT_SECRET);
    return c.json({
      jwt:token
    })
  
  }catch(e){
    c.status(411);
    return c.text('Invalid')
  }
  })
  
  
  userRouter.post('/signin', async(c) => {
    const prisma=new PrismaClient({
      
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body =await c.req.json()
    const {success}=signUpInput.safeParse(body)
    if(!success){
      return c.json({
        msg:"invalid data"
      })
    }
    
    
  
    const user =await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
      c.status(403);
      return c.json({
        Message:"Invalid "
      })
    }
   
    const token =await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
      Message:"signed in ",
      jwt:token
    })
  })