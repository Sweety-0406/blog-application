import prisma from "@/app/libs/prismadb";

export interface IListingParams{
  userId?:string;
  category?:string;
  blog?:string
}

export var itemCount =0

export async function getListings(
  params : IListingParams
) {
    try {
      const {
        userId,
        category,
        blog
      } = params;


      let query :any = {};

      if(userId){
         query.userId = userId;
      }

      if(category){
        query.category=category;
      }

      if(blog){
        query.category=blog;
      }

      const listings = await prisma.listing.findMany({
        where:query,
        orderBy:{
            createdAt:'desc'
        }
      })  

      const safeListings = listings.map((listing)=>({
        ...listing,
        createdAt:listing.createdAt.toISOString()
      }))
      return safeListings;
    } catch (error:any) {
      console.log(error)
       throw new Error(error); 
    }
}