
'use client'

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import CommentList from "@/app/components/Listings/Comments";
import ListingCard from "@/app/components/Listings/ListingCard";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import  { categories } from "@/app/components/Navbar/Categories";
import { SafeListing,  SafeUser, SafeComment } from "@/app/types";
import {  useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



interface ListingClientProps{
    listing : SafeListing & {
       user:SafeUser
    };
    currentUser?:SafeUser | null,
    comment:(SafeComment & {
        user:SafeUser
    })[] | null;
    relatedListing:SafeListing[] | null

}
const ListingClient:React.FC<ListingClientProps>=({
    currentUser,
    listing,
    comment,
    relatedListing
})=>{

    const category = useMemo(()=>{
        return categories.find((item)=>
            item.label === listing.category
        )
    },[listing.category])
    

   const comments = listing.comments

    return (
        <Container>
            <div className="flex flex-col md:flex-row md:space-x-4 mx-auto justify-center">
                <div className="md:w-[130vh] xl:w-[240vh]  ">
                    <div>
                        <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        id={listing.id}
                        currentUser={currentUser}
                        />
                    </div>
                    <div className="flex flex-col mt-7">
                        <div className="border-[2px] border-sky-700 rounded-lg h-96 overflow-auto p-2 mb-2">
                            <ListingInfo
                            listing={listing}
                            user={listing.user}
                            category={category}
                            description = {listing.description}
                            />
                        </div>
                        <div>
                            <CommentList comment={comment} listing={listing} /> 
                        </div>
                    </div>
                </div>
                <div className="
                    border-[2px]
                    border-sky-700
                    p-2 rounded-md 
                    mt-4
                    md:mt-12
                    overflow-y-auto
                    md:overflow-y-scroll
                    md:h-[196vh]
                    xl:h-[180vh] 
                ">
                    {relatedListing === null || relatedListing.length == 0?
                        (
                            <div>
                                <div>
                                    <Heading title="Related posts" />
                                </div>
                               <div className="mt-6 text-xl text-rose-600">
                                 No more related posts !
                               </div>
                            </div>
                        ):(
                            <div >
                                <div>
                                    {<Heading title="Related posts" /> || <Skeleton  width={120} height={40} className="mt-3 ml-3"/>}
                                </div>
                                <div className="
                                  grid
                                  grid-cols-2
                                  md:grid-cols-1
                                  xl:grid-cols-2
                                  space-x-2
                                  sm:space-x-3
                                  
                                ">
                                {relatedListing.map((listing)=>{
                                    return (
                                        <ListingCard 
                                        currentUser={currentUser}
                                        key={listing.id}
                                        data={listing}  
                                        notDescription={true}               
                                        />
                                    )
                                })}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}

export default ListingClient;