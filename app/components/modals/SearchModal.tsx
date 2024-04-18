'use client';

import qs from 'query-string';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Heading from '../Heading';
import { categories } from '../Navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';


const SearchModal = ()=>{
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [blog, setBlog] = useState('');

    const onSubmit = useCallback(async ()=>{
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery:any ={
            ...currentQuery,
            blog
        } 

        const url = qs.stringifyUrl({
            url : '/',
            query : updatedQuery
        },{skipNull : true})

        searchModal.onClose();
        router.push(url);

    },[
        params,
        router,
        searchModal,
        blog
    ])
    let bodyContent=(
        <div>
            <Heading
            title="Which of these best describes your blog?"
            subtitle="Pick a category"
             />
             <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              max-h-[50vh]
              overflow-y-auto
             "
             >

                {categories.map((item)=>(
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                          
                            onClick={()=> setBlog(item.label)} 
                            label={item.label}
                            selected={blog === item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
             </div>

        </div>
    )


    return(
        <Modal
          isOpen={searchModal.isOpen}
          onClose={searchModal.onClose}
          onSubmit={onSubmit}
          title = "Filters"
          actionLabel="search"
          body={bodyContent}
        />
    )
}

export default SearchModal; 