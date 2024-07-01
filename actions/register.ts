"use server";
import * as z from "zod"
import bcrypt from "bcrypt"
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validadeFields = RegisterSchema.safeParse(values)

    if (!validadeFields.success) {
        return {error: "Invalid Fields"}
    }

    const { email, password, name } = validadeFields.data
    const hashedPassword = await bcrypt.hash(password, 10)



    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    //TODO: Send verification token email

    return {success: "Email sent!"}
    
}