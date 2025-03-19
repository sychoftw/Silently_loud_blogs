import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signUpInput, signInInput } from '@abhi988799/common-file';
export const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    console.log(body="body =---------------------------------------")
    const { success } = signUpInput.safeParse(body);
    if (!success) {
        return c.json({
            msg: "invalid data"
        });
    }
    console.log(success="Success =---------------------------------------")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
        console.log(user="user =---------------------------------------")
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: token
        });
    }
    catch (e) {
        c.status(411);
        return c.text('Invalid');
    }
});
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
        return c.json({
            msg: "invalid data"
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
            password:body.password
        }
    });
    if (!user) {
        c.status(403);
        return c.json({
            Message: "Invalid "
        });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        Message: "signed in ",
        token: token
    });
});
