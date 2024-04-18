
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface ListingIParams{
   listingId?:string
}

export default async function getListingByCategory(
   params:ListingIParams
){
 
   try {
       const listingId=params.listingId;
       const sanitizedListingId = listingId?.replace(/%7D/g, '');

       const listingById =await prisma.listing.findUnique({
           where:{
               id:sanitizedListingId
           }

       })
       const listing = await prisma.listing.findMany({
        where:{
            category:listingById?.category
        }
       })

       const safeList = listing.map((listing)=>({
           ...listing,
           createdAt:listing.createdAt.toISOString(),
        }))
        return safeList
   } catch (error:any) {
       throw new Error(error)
   }
}