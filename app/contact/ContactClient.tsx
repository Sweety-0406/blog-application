'use client'

import Button from "../components/Button"
import Container from "../components/Container"
import useContactModal from "../hooks/useContactModal"
import useRegisterModal from "../hooks/useRegisterModal"
import { SafeUser } from "../types"
import Map from "../components/Map"

interface contactPageProps{
    currentUser : SafeUser | null
}

const ContactPage:React.FC<contactPageProps> = ({
    currentUser
})=>{
    const registerModal = useRegisterModal()
    const contactModal = useContactModal()
    const indiaLatLng = { lat: 20.5937, lng: 78.9629 };
     const onClickHandler = ()=>{
        if(!currentUser){
            registerModal.onOpen()
        }else{
            contactModal.onOpen()
        }  
    }
    return(
        <div  className="bg-sky-950">
        <div className="m-10 -mt-14 -mb-[80px]">
            <div>
                <div className="flex flex-row mt-7 mx-auto ">
                    <div className=" flex flex-col w-full  sm:mr-20 border-2 border-sky-600 bg-sky-50 rounded-2xl sm:ml-10 px-2 mt-5 xl:m-16 xl:ml-20">
                        <div className="font-semibold text-2xl mt-8 ">Contact Us</div>
                        <div className="text-md text-gray-700 ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet id ullam ex adipisci, magni sit! Modi reprehenderit molestiae quas maiores.</div>
                        <div className="mt-10 mb-5 w-40">
                            <Button label="Click" onClick={onClickHandler} />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <img src="/images/contact-image-2.png" alt="image"  />
                    </div>
                </div>
                <div className="border-[1px] border-sky-600 my-4"></div>
                <div>
                    <h2 className="font-bold text-2xl text-sky-600">Our Company Location</h2>
                    <div className="mt-7 mx:20">
                        <Map center={indiaLatLng}/>
                    </div>
                </div>
                <div className="border-[1px] border-sky-600 my-4"></div>
                <div className="pb-8">
                    <h2 className="font-bold text-2xl text-sky-600">Contact Details</h2>
                    <div className="border-2 border-sky-600 bg-sky-50 rounded-2xl pl-2 py-2 mt-4 ">
                        <h2><span className="font-semibold"> Primary Contact:</span>  John Appleseed</h2>
                        <h2><span className="font-semibold"> Email:</span>  info@blogifier.com</h2>
                        <h2><span className="font-semibold"> Phone:</span>  +91 1234567890</h2>
                        <h2><span className="font-semibold"> Website:</span> https://www.blogifier.com</h2>
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export default ContactPage