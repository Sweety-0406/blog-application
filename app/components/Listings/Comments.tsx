'use client'

import { SafeComment, SafeListing, SafeUser } from "@/app/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Input from "../Inputs/Input"
import { IoSendSharp } from "react-icons/io5"
import Avatar from "../Avatar"
interface commentListProps{
    listing : SafeListing 
    comment : (SafeComment & {
        user : SafeUser
    })[] | null
}

const CommentList:React.FC<commentListProps> =({
    listing,
    comment
})=>{
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            comment:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues>= async(data)=>{
        try {
            const res =await axios.post(`/api/listings/${listing.id}/comments`,data)
            
            toast.success("comment is successfully submitted.")
            
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error("comment is not submitted")
        }
    }

    return (
        <div className="
        border-2
        border-sky-700
        rounded-xl
        h-[40vh]
        md:h-[75vh]
        xl:h-[59vh]
        p-4
        overflow-y-scroll
        ">
            <div>
                <div className="flex space-x-2 mb-2">
                    <Input 
                    id="comment"
                    label="Comment..." 
                    errors={errors}   
                    register={register}   
                    required         
                    />
                    <IoSendSharp onClick={handleSubmit(onSubmit)} className="mt-2 border-2 cursor-pointer rounded-md pl-[2px] border-sky-500 bg-sky-300 hover:bg-sky-200" size={30} />
                    </div>
                    <hr/>
                    <hr />
                    <hr />
                    {comment==null || comment?.length === 0  ?
                        (
                            <div className="mt-5 font-semibold">
                                No Comment...
                            </div>
                        ):(
                            <div className="mt-5">
                                <div>Comments</div>
                                {comment.map((item)=>{
                                    return(
                                        <div className="mb-3 border-2 border-sky-200 rounded-md pl-2" key={item.id}>
                                            <div className="flex space-x-3">
                                                <h1 className="text-md font-semibold">{item.user.name}</h1>
                                                <div className="h-5 mt-1 w-5"><Avatar src={item.user.image} /></div>
                                            </div>
                                            <h3 className="text-sm mb-1">{item.content}</h3>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
           </div>
        </div>
    )
}

export default CommentList