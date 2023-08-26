"use client";
import React from "react";
import Modal from "../Modal";
import * as yup from "yup";
import ModalForm, { ModalFilds } from "../ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { fetchInstance } from "@/config/fetch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { ButtonType } from "../Button";
import { useLoadingContext } from "@/context/loading";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateUser: React.FC<Props> = ({ setModalOpen }) => {
  const schema = yup
    .object({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().required("Email é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais")
        .required("Confirmação de senha é obrigatória"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const { setLoading } = useLoadingContext();

  const onSubmitCreateUser = (data) => {
    setLoading(true);
    delete data.passwordConfirmation;
    fetchInstance(routes.user.create, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Usuário criado com sucesso!");
        setModalOpen(false);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Erro ao criar usuário! Erro: ${err.message}}`);
      })
      .finally(() => setLoading(false));
  };

  const createUserfields: ModalFilds[] = [
    {
      fieldName: "name",
      type: "text",
      placeHolder: "nome",
    },
    {
      fieldName: "email",
      type: "email",
      placeHolder: "email",
    },
    {
      fieldName: "password",
      type: "password",
      placeHolder: "senha",
    },
    {
      fieldName: "passwordConfirmation",
      type: "password",
      placeHolder: "confirme sua senha",
    },
  ];
  return (
    <Modal setModalOpen={setModalOpen}>
      <h1 className="text-blue-500 font-semibold">Crie um usuário!</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Separamos um cantinho especial para que você possa criar qualquer conta.
      </p>
      <ModalForm
        label="Criar usuário"
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        fields={createUserfields}
        onSubmit={onSubmitCreateUser}
        type={ButtonType.CREATE_USER}
      />
    </Modal>
  );
};

export default ModalCreateUser;
