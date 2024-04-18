'use client'

import useBlogModal from "@/app/hooks/useBlogModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS{
    CATEGORY = 0,
    IMAGES = 1,
    DESCRIPTION = 2
}

const BlogModal=()=>{
    const blogModal=useBlogModal();
    const router =useRouter();

    const [step,setStep]=useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    }=useForm<FieldValues>({
       defaultValues:{
        category:'',
        imageSrc:'',
        title:'',
        description:''
       } 
    });

    const category = watch('category');
    const imageSrc = watch('imageSrc');


    const [isLoading,setIsLoading]=useState(false)

    const setCustomValue=(id:string,value:any)=>{
      setValue(id,value,{
        shouldDirty:true,
        shouldTouch:true,
        shouldValidate:true,
      })  
    }
    const onBack=()=>{
        setStep((value)=>value-1);
    };
    const onNext=()=>{
        setStep((value)=>value+1);
    };

    const onSubmit : SubmitHandler <FieldValues>=(data)=>{
        if(step !== STEPS.DESCRIPTION){
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings',data)
        .then(()=>{
           toast.success('Listings Created!');
           router.refresh();
           reset();

        })
        .catch(() => {
            toast.error('Something went wrong.');
          })
          .finally(() => {
              setIsLoading(false);
              setStep(STEPS.CATEGORY);
              blogModal.onClose();
          })
        
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.DESCRIPTION){
            return 'Create'
        }

        return 'Next'
    },[step]);

    const secondaryActionLabel=useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back'
    },[step])
   
    var bodyContent=(
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
                          
                            onClick={(category)=> setCustomValue('category',category)} 
                            label={item.label}
                            selected={category === item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
             </div>

        </div>
    )



    if(step===STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                  title="Add a photo of your blog"
                  subtitle="Show viewers how your blog looks like!"
                />
                <ImageUpload 
                 value={imageSrc}
                 onChange={(value)=>setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                  title = "How would you describe your blog?"
                  subtitle="Short and sweet works best!"
                 />
                 <Input
                   id='title'
                   label="Title"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                  />
                  <hr />
                 <Input
                   id='description'
                   label="Description"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                  />
            </div>
        )
    }
    
    return (
        <div>
            <Modal
                isOpen={blogModal.isOpen}
                onClose={blogModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}         
                title="Blogifier your blog!"  
                body={bodyContent}
            />
           
  
        </div>
          )
}

export default BlogModal;



