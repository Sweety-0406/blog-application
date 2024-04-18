'use client';

import { IconType } from "react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {BiDollar} from 'react-icons/bi'

interface InputProps{
  id:string,
  label:string,
  type?:string,
  disabled?:boolean,
  formatPrice?:boolean,
  required?:boolean,
  register:UseFormRegister<FieldValues>,
  errors:FieldErrors

}
const Input:React.FC<InputProps>=({
    id,
    label,
    type,
    disabled,
    formatPrice,
    register,
    required,
    errors
})=>{
    return (
        <div className="w-full relative mb-1">
            {formatPrice && (
                <BiDollar
                  size={24}
                  className="
                     text-neutral-700
                     absolute
                     top-5
                     left-2
                  "
                />
            )}
              <input
               id={id}
               disabled={disabled}
               {...register(id,{required})}
               type={type}
               placeholder=" "
               className={`
                peer
                w-full
                p-2
                pt-4
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                pl-4
                ${errors[id] ? 'border-rose-500' : 'border-sky-500'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-700'}
                `}
                
              />
              
             <label className={`
                absolute
                text-md
                duration-150
                transform
                -translate-y-3
                top-3
                z-10
                origin-[0]
                left-4
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4

             `}
              >

              {label}
             </label>

        </div>
    )
}

export default Input;