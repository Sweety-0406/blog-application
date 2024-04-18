'use client'

import Container from "../Container";
import { TbBeachOff, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiIsland, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiWindmill, GiAbstract097 } from "react-icons/gi";
import { MdAutoAwesome, MdEmojiTransportation, MdMovieFilter, MdOutlineVilla, MdPets, MdSportsKabaddi } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
import { FaHandHoldingHeart, FaSkiing } from 'react-icons/fa';
import { FaBlog, FaCircleInfo, FaFaceGrinBeam } from "react-icons/fa6";
import { IoDiamond, IoGameControllerSharp, IoMusicalNotesSharp } from 'react-icons/io5';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { SiDcentertainment, SiMoneygram } from "react-icons/si";
import { DiYii } from "react-icons/di";


export const categories=[
    {
        label:'Blogging',
        icon:FaBlog,
        description:'This property is close to the Beach!'
    },
    {
        label:'Lifestyle',
        icon:IoDiamond,
        description:'This property has windmills!'
    },
    {
        label:'Health',
        icon:FaHandHoldingHeart,
        description:'This property is modern!'
    },
    {
        label:'Music',
        icon:IoMusicalNotesSharp,
        description:'This property is the countryside!'
    },
    {
        label:'Video games',
        icon:IoGameControllerSharp,
        description:'This property has a beautiful pool!'
    },
    {
        label:'Parenting',
        icon:RiParentFill,
        description:'This property is on an island!'
    },
    {
        label:'Entertainment',
        icon:SiDcentertainment,
        description:'This property is near a lake!'
    },
    {
        label:'Beauty',
        icon:MdAutoAwesome,
        description:'This property has skiing activities!'
    },
    {
        label:'Fashion',
        icon:GiAbstract097,
        description:'This property is an ancient castle!'
    },
    {
        label:'Travel',
        icon:MdEmojiTransportation,
        description:'This property is in a spooky cave!'
    },
    {
        label:'Diy',
        icon:DiYii,
        description:'This property offers camping activities!'
    },
    {
        label:'Affilate blog',
        icon:SiMoneygram,
        description:'This property is arctic environment!'
    },
    {
        label:'Movies',
        icon:MdMovieFilter,
        description:'This property is in the desert!'
    },
    {
        label:'Sports',
        icon:MdSportsKabaddi,
        description:'This property is in a barn!'
    },
    {
        label:'Pets',
        icon: MdPets,
        description:'This property is brand new and luxurious!'
    },
    {
        label:'Infographic',
        icon: FaCircleInfo,
        description:'This property is brand new and luxurious!'
    }
]

const Categories =()=>{
    const params=useSearchParams();
    const category=params?.get('category');
    const pathname=usePathname();

    const isMainPage = pathname ==='/';
    if(!isMainPage){
        return null;
    }
    return (
        <Container>
            <div className="
               flex
               flex-row
               pt-1
               items-center
               justify-between
               overflow-x-auto
            ">
                {categories.map((item)=>(
                   <CategoryBox
                     key={item.label}
                     label={item.label} 
                     icon={item.icon}
                     selected={category===item.label}
                   />
                ))}

            </div>
       
        </Container>
    )
}

export default Categories;

function useServerParams() {
    throw new Error("Function not implemented.");
}
