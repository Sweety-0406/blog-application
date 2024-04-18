'use client';

import { useEffect, useState, useCallback } from "react";
import {IoMdCloseCircleOutline} from 'react-icons/io';
import Button from "../Button";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModel] = useState(isOpen);
    
    useEffect(() => {
        setShowModel(isOpen);
    }, [isOpen])

    const handleClose=useCallback(()=>{
        if(disabled){
            return ;
        }
        setShowModel(false);
        setTimeout(()=>{
           onClose();
        },300)
    },[disabled,onClose]);

    const handleSubmit=useCallback(()=>{
        if(disabled){
            return;
        }
        onSubmit();
        
    },[disabled,onSubmit]);

    const handleSecondaryAction=useCallback(()=>{
        if(disabled || !secondaryAction){
            return;
        }

        secondaryAction();
    },[disabled,secondaryAction]);



    if(!isOpen){
     
        return null;
    }
    
    return (
        <div 
        className="
         inset-0
         flex
         justify-center
         items-center
         overflow-x-hidden
         overflow-y-auto
         fixed
         z-50
         outline-none
         focus:outline-none
         bg-neutral-800/70
        "
        >
            <div className="
              relative 
              sm:w-4/6
              lg:w-3/6
              xl:w-2/5
              my-6
              mx-auto
              sm:h-auto
            ">
                <div className={`
                 translate
                 duration-300
                 h-auto
                 flex
                 justify-center
                 ${showModal ? 'translate-y-0' : 'translate-y-full'}
                 ${showModal ? 'opacity-100' : 'opacity-0'}
                `} 
                 >
                    {/* CONTENT */}
                    <div className="
                      flex
                      flex-col
                      translate
                      h-full
                      md:h-auto
                      border-0
                      rounded-lg
                      shadow-lg
                      relative
                      w-full
                      bg-white
                      outline-none
                      focus:outline-none
                    ">
                        {/* HEADER */}
                      <div className="
                        flex
                        justify-center
                        items-center
                        p-4
                        rounded-t
                        relative
                        border-b-[1px] 
                      ">
                        <button className="
                          p-1
                          border-0
                          hover:opacity-70
                          transition
                          absolute
                          left-9
                         "
                          onClick={handleClose}
                         >

                          <IoMdCloseCircleOutline size={28}/>
                        </button>
                         <div className="text-lg font-semibold">
                            {title}
                         </div>
                      </div>
                      {/* BODY */}
                      <div className="relative p-6 flex-auto">
                        {body}
                      </div>
                      {/* FOOTER */}
                      <div className="flex flex-col gap-3 px-6 py-2">
                        <div className="
                          flex 
                          flex-row
                          items-center
                          justify-center
                          gap-4
                          w-full
                        ">
                          {secondaryAction && secondaryActionLabel && (
                            <Button 
                            outline
                            disabled={disabled}
                            label={secondaryActionLabel}
                            onClick={handleSecondaryAction}
                            />
                          )}

                          <Button 
                           outline={false} 
                           disabled={disabled}
                           label={actionLabel}
                           onClick={handleSubmit}
                           />
                        </div>
                        {footer}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;