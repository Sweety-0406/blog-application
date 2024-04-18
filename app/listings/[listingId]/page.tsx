import getCurrentUser from "@/app/action/getCurrentUser";
import getListingById from "@/app/action/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCommentById from "@/app/action/getCommentById";
import getListingByCategory from "@/app/action/getListingByCategory";

interface Iparams{
    listingId?:string,
}
const ListingPage=async ({params}:{params : Iparams})=>{

  console.log(params)
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const comment = await getCommentById(params)
    
    if(!listing){
      return(
        <ClientOnly>
            <EmptyState />
        </ClientOnly>
      )  
    }
    const relatedListing = await getListingByCategory(params)

    return(
        <ClientOnly>
            <ListingClient
              listing={listing}
              currentUser={currentUser}
              comment = {comment}
              relatedListing={relatedListing}
            />
        </ClientOnly>
    )
}

export default ListingPage;