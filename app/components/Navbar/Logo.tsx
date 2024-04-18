'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo=()=>{
    const router=useRouter(); 
    return (
        
            <Image
            onClick={()=>router.push('/')}
            src='/images/logo.png'
            alt='Logo' 
            height='50'
            width='50'
            className='block cursor-pointer'        
            />
       
        
        
    )
}

export default Logo;