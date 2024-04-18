'use client';

import axios from "axios";
import {useState} from 'react';
import { FieldValues,  SubmitHandler, useForm} from 'react-hook-form';
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../Inputs/Input";
import {toast} from "react-hot-toast";
import useContactModal from "@/app/hooks/useContactModal";



const ContactModal=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const contactModal = useContactModal()
    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
           name:'',
            email:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios.post('/api/contact',data)
        .then(()=>{
            toast.success('Successfully contact form submitted!',{
                icon:'😊'
            })
            contactModal.onClose()
        })
        .catch((error)=>{
            toast.error('Something went wrong...',{
                icon:'🤷‍♀️'
            });
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const bodyContent=(
        <div>
            <Heading
              title='Welcome to Blog-App'
              subtitle='Please fill the contact form'
              
             />
             <Input 
              id={"email"}
              label={"Email"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
             <Input 
              id={"name"}
              label={"Name"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required    
                    
             />
             <Input 
              id={"message"}
              label={"Message"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required    
                    
             />
        </div>
    )
    return (
        <div>
          <Modal
                onClose={contactModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                isOpen={contactModal.isOpen}
                actionLabel={"Send Message"}
                disabled={isLoading}
                title='Contact Form'   
                body={bodyContent}       
          />
        </div>
    )
}

export default ContactModal;