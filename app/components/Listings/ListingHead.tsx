'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from 'next/image'
import HeartButton from "../HeartButton";

interface ListingHeadProps{
     title : string;
     id : string;
     imageSrc : string;
     currentUser?: SafeUser | null ;
     
}
const ListingHead:React.FC<ListingHeadProps>=({
    title,
    id,
    imageSrc,
    currentUser
})=>{
    return (
        <>
            <Heading 
                title={title}
                color
                subtitle={ "#Awesome Blog"}
            />
           
            <div className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative
            ">
                <Image
                src={imageSrc}
                alt="Image"
                fill
                className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                    />
                </div>
                
            </div>
        </>
    )
}

export default ListingHead;