'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BsSearch} from 'react-icons/bs'
const Search=()=>{
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const blog = params?.get('blog');

    const blogLabel = useMemo(()=>{
        if(blog){
            return `${blog} `;
        }
        return 'Blog';
    },[blog]);

    return (
        <div
         onClick={searchModal.onOpen} 
         className='
         border-[1px]
         w-auto
         py-2
         rounded-full
         shadow-sm
         hover:shadow-md
         transition
         cursor-pointer
        '>   
            <div className='
            text-sm
            pl-6
            pr-2
            text-black
            font-bold
            flex
            flex-row
            items-center
            gap-3
            '>
                <div className='hidden sm:block  hover:underline underline-offset-2'>{blogLabel}</div>
                <div className='
                    p-2
                    bg-sky-900
                    rounded-full
                    text-white
                '>
                <BsSearch size={18}/>
                </div>
            </div>
        </div>
    )
}

export default Search;