'use client'

import { IconType } from "react-icons"
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface CategoryBoxProps{
    label:string;
    icon: IconType;
    selected?: boolean;
}
const CategoryBox:React.FC<CategoryBoxProps>=({
    label,
    icon:Icon,
    selected
})=>{
    const router=useRouter();
    const params=useSearchParams();

    const handelClick=useCallback(()=>{
        let currentQuery={};
        if(params){
            currentQuery=qs.parse(params.toString())
        }
        const updatedQuery:any={
            ...currentQuery,
            category:label
        }
        if(params?.get('category') === label){
            delete updatedQuery.category;
        }
        const url=qs.stringifyUrl({
            url:'/',
            query:updatedQuery
        },{skipNull:true})

        router.push(url);
    },[label,params,router])

    return (
        <div 
        onClick={handelClick}
        className={`
        -mt-1
         flex
         flex-col
         items-center
         justify-center
         gap-1
         p-3
         border-b-2
         hover:text-neutral-800
         transition
         cursor-pointer
         ${selected? 'border-b-neutral-800' : 'border-transparent'}
         ${selected? 'text-neutral-800' : 'text-neutral-500'}
        `}>
          <Icon size={22} />
          <div className="font-medium text-sm">
            {label}
          </div>
        </div>
    )
}
export default CategoryBox;