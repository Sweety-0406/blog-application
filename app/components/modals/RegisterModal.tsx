'use client';

import axios from "axios";
import {useState,useEffect,useCallback} from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { FieldValues,  SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../Inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";



const RegisterModal=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
           name:'',
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios.post('/api/register',data)
        .then(()=>{
            toast.success('Successfully registered!',{
                icon:'😊'
            })
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error)=>{
            toast.error('User already exist...',{
                icon:'🤷‍♀️'
            });
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const toggle=useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[])
    const bodyContent=(
        <div>
            <Heading
              title='Welcome to Blog-App'
              subtitle='Create an account'
              
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
              label={"Username"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
             <Input 
              id={"password"}
              label={"Password"} 
              type='password'
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
        </div>
    )
    const footerContent=(
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
              outline
              label="Continue with Google"
              icon={FcGoogle}
              onClick={()=>signIn('google')} 
            />
            <Button
              outline
              label="Continue with Github"
              icon={AiFillGithub}
              onClick={()=>signIn('github')} 
            />
            <div className="
             text-neutral-500
             text-center
             mt-4
             font-light
            ">
                <div className="
                  justify-center
                  flex
                  flex-row
                  items-center
                  gap-2
                ">
                    <div>
                      Already have an account?
                    </div>
                    <div
                      onClick={toggle}
                      className="
                      text-neutral-800
                      cursor-pointer
                      hover:underline
                    ">
                       Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
          <Modal
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                isOpen={registerModal.isOpen}
                actionLabel={"Continue"}
                disabled={isLoading}
                title='Register'   
                body={bodyContent}     
                footer={footerContent}    
          />
        </div>
    )
}

export default RegisterModal;