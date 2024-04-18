
import getCurrentUser from './action/getCurrentUser';
import { getListings, IListingParams } from './action/getListings';
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import ListingCard from './components/Listings/ListingCard';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


interface HomeProps{
  searchParams : IListingParams
}
const Home = async ({searchParams}:HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();



  if(listings.length === 0){
    return(
      <ClientOnly>
         <EmptyState showReset />
      </ClientOnly>
    )
  }
  
  return (
     <ClientOnly>
        <Container>
           <div className='
             pt-24
             grid
             grid-cols-1
             sm:grid-cols-2
             lg:grid-cols-4
             gap-8
           '>
            {listings.map((listing)=>{
              return(
                <ListingCard
                  currentUser={currentUser}
                   key={listing.id}
                   data={listing}
                 />
                 ||
                 <Skeleton className="w-full h-full" />
              )
            })}
           </div>
          
        </Container>
     </ClientOnly>
  )
}

export default Home;
