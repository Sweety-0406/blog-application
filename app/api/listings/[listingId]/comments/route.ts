import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server"

export async function POST(
    req:Request,
    {params}:{params:{listingId:string}}
) {
    try {
        const currentUser = await getCurrentUser();
         if(!currentUser){
            return NextResponse.error();
        }
    
        const listingId = params.listingId
        if(!listingId || typeof listingId !== 'string'){
            return new NextResponse("Listing id is not found.")
        }
    
        const body =  await req.json()
        const comment = body.comment

        if(!comment || typeof comment !== 'string'){
            return new NextResponse("Content is not found.")
        }        
        
        const newComment = await prisma?.comment.create({
            data:{
                content:comment,
                userId:currentUser.id,
                listingId
            }
        })
        if(!newComment){
            return new NextResponse("No comment is created.")
        }
    
        return NextResponse.json(newComment)
    } catch (error) {
        console.log(error)
        return new NextResponse("something went wrong")
    }
}



