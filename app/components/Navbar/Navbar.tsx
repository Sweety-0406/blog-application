'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface NavbarProps{
    currentUser?: SafeUser | null;
}

const Navbar:React.FC<NavbarProps>=({currentUser})=>{
    const router = useRouter()
    return(
        
        <div className="fixed w-full  bg-white z-10 shadow-sm">
            <div className="
             py-4
             border-b-[2px]
             border-sky-600
            "
            >
                <Container>
                    <div className="
                      flex
                      flex-row
                      items-center
                      justify-between
                      gap-3
                      md:gap-0
                    ">
                        <Logo/>
                        <div className="font-semibold cursor-pointer hover:underline hover:underline-offset-1" onClick={()=>router.push('/about')}>About</div>
                        <div className="font-semibold cursor-pointer hover:underline hover:underline-offset-1" onClick={()=>router.push('/contact')}>Contact</div>
                        <div className="flex space-x-2">
                            <Search/>
                            <UserMenu currentUser={currentUser} />
                      </div>
                    </div>
                </Container>
            </div>
            <div className="border-[1px] border-sky-600"></div>
            
            
        </div>
    )
}

export default Navbar;