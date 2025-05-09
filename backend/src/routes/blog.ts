import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { createBlogInput, CreateBlogInput, updateBlogInput } from '@abhi988799/common-file'

export const  blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }, Variables: {
    userId: string
  }
}>()

//middleware

blogRouter.use('/*', async (c, next) => {
  console.log("inside uiderid")
  interface CustomJWTPayload {
    id: string;
    exp?: number; // Optional expiration field
  }
  const token = c.req.header("authorization") || ""
  
  console.log("token -- " ,token)

  const user = await verify(token, c.env.JWT_SECRET) as unknown as CustomJWTPayload;

  if (user && typeof user.id === "string") {

    c.set("userId", user.id)
    console.log("userid --------------------", c.get("userId"))

    await next()
  } else {
    return c.json({ error: "Invalid token" }, 401);
  }
  return c.json({ error: "Unauthorized" }, 401);

})


blogRouter.post('/', async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body)
  if (!success) {
    return c.json({
      msg: "invalid data"
    })
  }
  const prisma = new PrismaClient({

    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const userId = c.get("userId")

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })
  return c.json({
    id: blog
  })

})


blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body)
  if (!success) {
    return c.json({
      msg: "invalid data"
    })
  }
  const prisma = new PrismaClient({

    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,

    }
  })
  return c.json({
    id: blog
  })
})


blogRouter.get('/bulk', async (c) => {
  console.log("inside bulk")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  

  const blogs = await prisma.post.findMany(
    {
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: { 
            name: true
          }
        } 
      }
    }
  );

  return c.json({
    blogs
  })
})


blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({

    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  console.log("inside id sextion of the blog")
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
 
    })
    return c.json({
      msg:"got the required blog",
      blog
    })

  } catch (e) {
    c.status(411)
    return c.json({
      msg: "Someting unvail"
    })

  }


})
