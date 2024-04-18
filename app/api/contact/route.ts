import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(
    req: Request
) {
    try {
        const currentUser = await getCurrentUser()
    
        if(!currentUser){
            return new NextResponse("Anauthorized user.")
        }
    
        const body = await req.json()
        const{email,name,message} = body
        if(!email || !name || !message){
            return new NextResponse("All fields are required.")
        }
    
        const contact = await prisma.contact.create({
            data:{
                email,
                name,
                message,
                userId:currentUser.id
            }
        })
        if(!contact){
            return new NextResponse("Contact is permitted")
        }
        return NextResponse.json(contact)
    } catch (error) {
        console.log(error)
        return new NextResponse("something went wrong.")
    }
}