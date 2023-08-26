"use client";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BiSolidCrown } from "react-icons/bi";
import { BsCircleFill, BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Button, { ButtonType } from "../Button";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
}

interface Props {
  user: User;
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const { id, email, name, createdAt, updatedAt, roles } = user;

  const { data: userData } = useSession();
  const router = useRouter();

  const deleteUser = () => {
    fetchInstance(routes.admin.delete(id), {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Usuário deletado com sucesso!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Erro ao deletar usuário!");
      });
  };

  const turnUserIntoAdmin = (id) => {
    fetchInstance(routes.admin.set(id), {
      method: "PATCH",
    })
      .then(() => {
        toast.success("Usuário promovido com sucesso!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Erro ao promover usuário!");
      });
  };

  const onClick = () => turnUserIntoAdmin(id);

  return (
    <div
      className={`bg-white transition-all hover:border-2 hover:border-blue-500 w-[30vw] 
      } px-4 py-1 rounded-xl`}
    >
      <div className="flex justify-between">
        <div className="flex items-center text-blue-500 text-lg font-semibold">
          {name.toUpperCase()}
          {userData?.user?.email === email && (
            <>
              <BsCircleFill className={"ml-10"} size={10} />
              <span className="text-black ml-1 font-medium text-sm">você</span>
            </>
          )}
          {roles.some((role) => "ADMIN".includes(role)) && (
            <BiSolidCrown className={"fill-yellow-500 ml-2"} size={20} />
          )}
        </div>
        {userData?.user?.email !== email && (
          <BsFillTrashFill
            className={"fill-black transition-all hover:fill-red-500"}
            size={20}
            onClick={() => deleteUser()}
          />
        )}
      </div>
      <h2 className="text-gray-500">{id}</h2>
      <div className="flex items-center justify-between">
        <p className="text-gray-500">{email}</p>
        <div>
          <p className="text-gray-500">
            última atualização:{" "}
            {new Date(updatedAt).toLocaleDateString("pt-BR")}
          </p>
          <p className="text-gray-500">
            criado em: {new Date(createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
      {userData?.user?.email !== email &&
        !roles.some((role) => "ADMIN".includes(role)) && (
          <Button onClick={onClick} theme={ButtonType.CREATE_USER}>
            Tornar Admin
          </Button>
        )}
    </div>
  );
};

export default ProfileCard;
