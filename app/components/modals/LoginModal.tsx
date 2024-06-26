'use client';

import axios from "axios";
import {useState,useEffect,useCallback} from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { FieldValues,  SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../Inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/navigation';



const LoginModal=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const router=useRouter();
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
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        signIn('credentials',{...data,redirect:false})
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('You are Logged in')
                router.refresh()
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle=useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal,registerModal])
    const bodyContent=(
        <div>
            <Heading
              title='Welcome back to Blog-App'
              subtitle='Login to your account'
              
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
                      New to Blogifier?
                    </div>
                    <div
                      onClick={toggle}
                      className="
                      text-neutral-800
                      cursor-pointer
                      hover:underline
                    ">
                       Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
          <Modal
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                isOpen={loginModal.isOpen}
                actionLabel={"Continue"}
                disabled={isLoading}
                title='Login'   
                body={bodyContent}     
                footer={footerContent}    
          />
        </div>
    )
}

export default LoginModal;