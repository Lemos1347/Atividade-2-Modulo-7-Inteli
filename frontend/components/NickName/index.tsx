"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button, { ButtonType } from "../Button";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLoadingContext } from "@/context/loading";
import { ClipLoader } from "react-spinners";

interface Props {
  name: string;
  nickName: string;
  id: string;
}

const NickName: React.FC<Props> = ({ name, nickName, id }) => {
  const [changeNickName, setChangeNickName] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>("");
  const { loading, setLoading } = useLoadingContext();

  const router = useRouter();

  const handleClick = () => {
    setChangeNickName(!changeNickName);
  };

  const onClickChangeNickName = () => {
    setLoading(true);
    handlePatch(id);
  };

  const handlePatch = (id: string) => {
    if (!newNickName) {
      setChangeNickName(false);
      setLoading(false);
      return;
    }
    fetchInstance(routes.pokemon.updateNickName(id), {
      method: "PATCH",
      body: JSON.stringify({ nickName: newNickName }),
    })
      .then(() => {
        setChangeNickName(!changeNickName);
        toast.success("Apelido atualizado com sucesso!");
        router.refresh();
      })
      .catch((e) => {
        toast.error(`Erro ao atualizar apelido: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {changeNickName ? (
        <div className="inline-block">
          <input
            onChange={(e) => {
              if (e.target.value !== newNickName) {
                setNewNickName(e.target.value);
              } else {
                setNewNickName("");
              }
            }}
            className="border-2 rounded-full overflow-x-auto py-1 w-32 px-5 text-black border-gray-300"
            defaultValue={nickName}
          />
          <Button
            onClick={onClickChangeNickName}
            theme={ButtonType.CREATE_POKEMON}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader
                color={"white"}
                size={17}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "MUDAR"
            )}
          </Button>
        </div>
      ) : (
        <>
          <p className="text-black px-5 flex items-center justify-between">
            {nickName}{" "}
            <FiEdit
              onClick={handleClick}
              className={
                "cursor-pointer rounded-lg hover:bg-black hover:fill-white px-1 py-1"
              }
              size={25}
            />
          </p>
          <div className="text-black px-5">A.K.A. {name.toUpperCase()}</div>{" "}
        </>
      )}
    </>
  );
};

export default NickName;
