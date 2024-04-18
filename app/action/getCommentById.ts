import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams{
   listingId?:string
}

export default async function getCommentById(
   params:IParams
){
 
   try {
       const {listingId}=params;
       const sanitizedListingId = listingId?.replace(/%7D/g, '');
       const comments =await prisma.comment.findMany({
           where:{
            listingId:sanitizedListingId
           },
           include:{
               user:true
           }

       })
       if(!comments){
           return null;
       }
       const modifiedComments = comments.map(comment => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            user: {
                ...comment.user,
                createdAt: comment.user.createdAt.toISOString(),
                updatedAt: comment.user.updatedAt.toISOString(),
                emailVerified: comment.user.emailVerified?.toDateString() || null,
            }
        }));

        return modifiedComments;
   } catch (error:any) {
       throw new Error(error)
   }
}