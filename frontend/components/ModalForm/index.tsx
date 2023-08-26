"use client";
import React from "react";
import Button, { ButtonType } from "../Button";
import InputModal from "../InputModal";
import { useLoadingContext } from "@/context/loading";
import { ClipLoader } from "react-spinners";

export interface ModalFilds {
  fieldName: string;
  type: string;
  placeHolder: string;
}

interface Props {
  fields: ModalFilds[];
  handleSubmit: any;
  register: any;
  errors: any;
  onSubmit: any;
  type: ButtonType;
  label: string;
}

const ModalForm: React.FC<Props> = ({
  onSubmit,
  fields,
  type,
  handleSubmit,
  register,
  errors,
  label,
}) => {
  const { loading } = useLoadingContext();

  return (
    <form
      className="flex flex-col justify-center gap-2 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields &&
        fields.map((field, index) => (
          <InputModal
            key={index}
            resgisterInputForm={register}
            fieldErrors={errors}
            {...field}
          />
        ))}
      <Button disabled={loading} theme={type}>
        {loading ? (
          <ClipLoader
            color={"white"}
            size={30}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          label
        )}
      </Button>
    </form>
  );
};

export default ModalForm;
