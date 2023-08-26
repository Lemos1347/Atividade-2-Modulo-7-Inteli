"use client";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Modal from "../Modal";
import ModalForm, { ModalFilds } from "../ModalForm";
import { ButtonType } from "../Button";
import { useLoadingContext } from "@/context/loading";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreatePokemon: React.FC<Props> = ({ setModalOpen }) => {
  const router = useRouter();

  const { loading, setLoading } = useLoadingContext();

  const schema = yup
    .object({
      pokemonName: yup.string().required("Nome é obrigatório"),
      nickName: yup.string().required("Apelido é obrigatório"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitCreatePokemon = (data) => {
    setLoading(true);
    console.log(loading);
    fetchInstance(routes.pokemon.create, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Pokemon criado com sucesso!");
        setModalOpen(false);
        router.refresh();
      })
      .catch((e) => {
        toast.error("Erro ao criar pokemon!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createPokemonFields: ModalFilds[] = [
    {
      fieldName: "pokemonName",
      type: "text",
      placeHolder: "nome ou id",
    },
    {
      fieldName: "nickName",
      type: "text",
      placeHolder: "apelido",
    },
  ];

  return (
    <Modal setModalOpen={setModalOpen}>
      <h1 className="text-red-600 font-semibold">
        Adicione um pokemon a sua pokedex!
      </h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Separamos um cantinho especial para que você possa adicionar os seus
        pokemons preferidos.
      </p>
      <ModalForm
      label="Adicionar Pokemon"
        fields={createPokemonFields}
        onSubmit={onSubmitCreatePokemon}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        type={ButtonType.CREATE_POKEMON}
      />
    </Modal>
  );
};

export default ModalCreatePokemon;
