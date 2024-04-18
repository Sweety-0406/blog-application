import getCurrentUser from "../action/getCurrentUser";
import getFavoritesListing from "../action/getFavoritesListing";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";


const FavoritesPage=async () => {
   const currentUser = await getCurrentUser();
   const listings = await getFavoritesListing();

   if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title="Unauthorized!"
                subtitle="Please Login" 
                />
            </ClientOnly>
        )
   } 

   if(listings.length === 0 ){
        return (
            <ClientOnly>
                <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorites listings." 
                />
            </ClientOnly>
        )
   }

   return (
     <ClientOnly>
        <FavoritesClient 
           listings = {listings}
           currentUser = {currentUser}
        />
     </ClientOnly>
   )
}

export default FavoritesPage;