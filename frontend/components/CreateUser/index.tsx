"use client";
import React from "react";
import Button, { ButtonType } from "@/components/Button";
import ModalCreateUser from "../ModalCreateUser";
import { useRouter } from "next/navigation";
import Logout from "../Logout";

interface Props {}

const CreateUser: React.FC<Props> = (props) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  const onClick1 = () => {
    if (setModalOpen) setModalOpen(true);
  };
  return (
    <>
      <div className="flex">
        <div className="flex gap-5 px-10 pt-[4vh]">
          <Button
            onClick={onClick}
            className={"border-blue-500 text-blue-500"}
            theme={ButtonType.CHANGE_PAGE}
          >
            Minha POKÉDEX
          </Button>
          <Button theme={ButtonType.CREATE_USER} onClick={onClick1}>
            + Crie um usuário
          </Button>
          <Logout theme={'ADMIN'} />
        </div>
      </div>
      {modalOpen && <ModalCreateUser setModalOpen={setModalOpen} />}
    </>
  );
};

export default CreateUser;
