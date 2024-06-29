"use server";
import * as z from "zod"

import { LoginSchema } from "@/schema";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validadeFields = LoginSchema.safeParse(values)

    if (!validadeFields.success) {
        return {error: "Invalid Fields"}
    }
    
    return {success: "Email sent!"}
    
}