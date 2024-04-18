'use client';

import { SafeListing,  SafeUser } from "@/app/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Image from 'next/image'
import HeartButton from "../HeartButton";
import Button from "../Button";
import Heading from "../Heading";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface ListingCardProps{
    data : SafeListing 
    onAction?:(id:string)=>void;
    disabled?:boolean;
    actionlabel?:string;
    actionId?:string;
    currentUser? : SafeUser | null;
    notDescription?: boolean;
}
const ListingCard:React.FC<ListingCardProps>=({
    data,
    onAction,
    disabled,
    actionId='',
    actionlabel,
    currentUser,
    notDescription,

})=>{
    const router =useRouter();
    const handleCancel = useCallback(
        (e:React.MouseEvent<HTMLButtonElement>)=>{
            e.stopPropagation();
            
            if(disabled){
                return;
            }
            onAction?.(actionId);
        },[onAction,actionId,disabled])


    
    return (
        <div 
          onClick={()=>router.push(`/listings/${data.id}}`)}
          className="col-span-1 cursor-pointer group"
        >
           <div className="gap-2 flex flex-col w-full">
            <div className={`
              aspect-square
              w-full
              relative
              overflow-hidden
              rounded-xl
              `}
            >
                {
                    <div>
                        <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                        />
                        <div className={`
                        absolute
                        top-3 
                        right-3
                        ${notDescription ? "hidden" : "block"}
                        `}>
                            <HeartButton
                                listingId={data.id}
                                currentUser={currentUser}
                            />
                        </div>
                    </div> 
                    || 
                    <Skeleton className="w-full h-full" />

                }
            </div>
            {
                <div className="flex flex-row justify-between ">
                    <Heading 
                        title={(data.title) }
                    /> 
                    <div>
                        {format(new Date(data.createdAt),"PPP")}
                    </div>    
                </div>
                || 
                <div className="flex justify-between w-full">
                    <Skeleton  width={120} height={30} />
                    <Skeleton  width={120} height={30} />
                </div>
            }
            {onAction && actionlabel && (

                <Button
                  disabled={disabled}
                  small
                  label={actionlabel}
                  onClick={handleCancel}
                />
                ||
                <Skeleton  width={120} height={30} />
            )}
           </div>
        </div>
    )
}

export default ListingCard;