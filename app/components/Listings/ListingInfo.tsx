'use client';

import { SafeListing, SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { format } from "date-fns";


interface ListingInfoProps{
    user:SafeUser
    listing:SafeListing
    description:string
    category:{
        icon: IconType
        label: string
        description: string
    } | undefined
}
const ListingInfo:React.FC<ListingInfoProps>=({
    user,
    description,
    category,
    listing
})=>{

    return (
            <div className="col-span-4 flex flex-col gap-8">
                
                <div className="flex flex-col gap-2">
                    <div className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                    ">
                        <div>Hosted By {user?.name}</div>
                        <Avatar src={user?.image} />
                    </div>
                    <div>Created At <span className="text-sky-600">{format(new Date(listing.createdAt),"PPP")}</span></div>
                    
                </div>
                <hr />
                { category && (
                        <ListingCategory 
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                        />
                    )}
                <hr />     
                <div className="text-lg font-light text-neutral-500">
                <div className="font-semibold text-black text-xl">About the post</div>
                {description}
                </div>
                <hr />             
                
            </div>
    )
}

export default ListingInfo;