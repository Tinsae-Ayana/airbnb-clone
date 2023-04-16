"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Model from "./Model";
import Input from "../inputs/input";
import Button from "../Button";
const RegisterModel = () => {
   const registerModel = useRegisterModel();
   const [isLoading, setIsLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: { name: "", email: "", password: "" },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      axios
         .post("/api/register/", data)
         .then(() => {
            registerModel.onClose();
         })
         .catch((error) => {
            toast.error("Something went wrong");
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading
            title={"Welcome to Airbnb"}
            subtitle={"Create An Acount!"}
         ></Heading>
         <Input
            id='email'
            label='email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         ></Input>
         <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         ></Input>
         <Input
            id='password'
            label='Password'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         ></Input>
      </div>
   );

   const footerContent = (
      <div className='flex flex-col  gap-4 mt-3'>
         <hr />
         <Button
            outline
            label='Continue with Google '
            icon={FcGoogle}
            onClick={() => {}}
         ></Button>
         <Button
            outline
            label='Continue with Github '
            icon={AiFillGithub}
            onClick={() => {}}
         ></Button>

         <div className=' text-neutral-500 text-center  mt-4 font-light'>
            <div className='flex flex-row  items-center gap-2 justify-center'>
               <div>Already have an account</div>
               <div className='text-neutral-800 cursor-pointer hover:underline'>
                  Log in
               </div>
            </div>
         </div>
      </div>
   );
   return (
      <div>
         <Model
            disabled={isLoading}
            isOpen={registerModel.isOpen}
            title='Registor'
            actionLabel='Continue'
            onClose={registerModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
         ></Model>
      </div>
   );
};

export default RegisterModel;
