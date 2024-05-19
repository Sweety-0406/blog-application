import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/action/getCurrentUser";


export async function POST(request:Request) {
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
   
    const body = await request.json();
    const{
        title,
        description,
        imageSrc,
        category
    }=body;

    const listing = await prisma.listing.create({
          data:{
            title,
            description,
            imageSrc,
            category,
            userId:currentUser.id
          }
    })
     
    return NextResponse.json(listing);
}

