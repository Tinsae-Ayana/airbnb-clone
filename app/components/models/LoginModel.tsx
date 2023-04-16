"use client";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Model from "./Model";
import Input from "../inputs/input";
import Button from "../Button";
import { useRouter } from "next/navigation";
const LoginModel = () => {
   const registerModel = useRegisterModel();
   const loginModel = useLoginModel();
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: { email: "", password: "" },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      signIn("credentials", { ...data, redirect: false }).then((callbacks) => {
         setIsLoading(false);
         if (callbacks?.ok) {
            toast.success("Loggid in");
            // router.refresh();
            loginModel.onClose();
         }
         if (callbacks?.error) {
            toast.error(callbacks.error);
         }
      });
   };

   const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading
            title={"Welcome to back"}
            subtitle={"Login to your account!"}
         ></Heading>
         <Input
            id='email'
            label='email'
            disabled={isLoading}
            register={register}
            errors={errors}
            type='email'
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
            isOpen={loginModel.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
         ></Model>
      </div>
   );
};

export default LoginModel;
