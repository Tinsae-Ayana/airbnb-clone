"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProp {
   currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProp> = ({ currentUser }) => {
   const registerModel = useRegisterModel();
   const loginModel = useLoginModel();
   const [isOpen, setIsOpen] = useState(false);
   const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
   }, []);
   return (
      <div className='relative'>
         <div className='flex flex-row items-center gap-3 '>
            <div
               className='hidden md:block text-sm  font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition  cursor-pointer'
               onClick={() => {}}
            >
               Airbnb your home
            </div>
            <div
               className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row  items-center  gap-3 rounded-full  cursor-pointer hover:shadow-md transition'
               onClick={toggleOpen}
            >
               <AiOutlineMenu></AiOutlineMenu>
               <div className='hidden md:block'>
                  <Avatar></Avatar>
               </div>
            </div>
         </div>
         {isOpen && (
            <div className='absolute  rounded-xl  shadow-md w-[40vw]  md:w-[3/4] overflow-hidden bg-white right-0 top-12 text-sm'>
               <div className=' flex flex-col  cursor-pointer'>
                  {!currentUser ? (
                     <>
                        <MenuItem
                           onClick={() => {}}
                           label='My trips'
                        ></MenuItem>
                        <MenuItem
                           onClick={() => {}}
                           label='My Favorite'
                        ></MenuItem>
                        <MenuItem
                           onClick={() => {}}
                           label='My Reservation'
                        ></MenuItem>
                        <MenuItem
                           onClick={() => {}}
                           label='My Properties'
                        ></MenuItem>
                        <MenuItem
                           onClick={() => {}}
                           label='Airbnb My home'
                        ></MenuItem>
                        <hr />
                        <MenuItem
                           onClick={() => {
                              signOut();
                           }}
                           label='Logout'
                        ></MenuItem>
                     </>
                  ) : (
                     <>
                        <MenuItem
                           onClick={() => {
                              loginModel.onOpen();
                           }}
                           label='login'
                        ></MenuItem>
                        <MenuItem
                           onClick={() => {
                              registerModel.onOpen();
                           }}
                           label='signup'
                        ></MenuItem>
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default UserMenu;
