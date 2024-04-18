 import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

 interface IParams{
    listingId?:string
 }


 export default async function getListingById(
    params:IParams
 ){
  
    try {
        const {listingId}=params;
        const sanitizedListingId = listingId?.replace(/%7D/g, '');
        const listing =await prisma.listing.findUnique({
            where:{
                id:sanitizedListingId
            },
            include:{
                user:true
            }

        })
        if(!listing){
            return null;
        }
        return {
            ...listing,
            createdAt:listing.createdAt.toISOString(),
            user:{
                ...listing.user,
                createdAt:listing.user.createdAt.toISOString(),
                updatedAt:listing.user.updatedAt.toISOString(),
                emailVerified:listing.user.emailVerified?.toDateString() || null,
            }
    }
    } catch (error:any) {
        throw new Error(error)
    }
 }