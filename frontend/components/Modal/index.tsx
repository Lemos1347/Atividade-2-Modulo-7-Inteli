"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import BackDrop, { BackDropType } from "../BackDrop";

interface Props {
  children?: React.ReactNode;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, setModalOpen }) => {
  return (
    <>
      <BackDrop setModalOpen={setModalOpen} type={BackDropType.MODAL} />
      <div className="bg-white px-10 py-5 rounded-md z-20 fixed top-[35vh] left-[50vw] translate-x-[-50%] translate-y-[-50%]">
        <AiOutlineClose
          className={"my-2 ml-auto cursor-pointer hover:fill-black"}
          onClick={() => setModalOpen(false)}
          color={"gray"}
          size={20}
        />
        {children}
      </div>
    </>
  );
};

export default Modal;
