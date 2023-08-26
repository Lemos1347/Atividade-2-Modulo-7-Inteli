import React from "react";

interface Props {
  resgisterInputForm: any;
  fieldErrors: any;
  fieldName: string;
  type: string;
  placeHolder: string;
}

const InputModal: React.FC<Props> = ({
  resgisterInputForm,
  fieldErrors,
  fieldName,
  type,
  placeHolder,
}) => {
  return (
    <>
      {fieldErrors[fieldName] && (
        <p className="text-red-400 text-end text-xs">
          {fieldErrors[fieldName]?.message}
        </p>
      )}
      <input
        className={`border-2 text-black px-2 py-1 ${
          fieldErrors[fieldName] ? "border-red-400" : "border-gray-300"
        } rounded-md`}
        placeholder={placeHolder}
        type={type}
        {...resgisterInputForm(fieldName)}
      />
    </>
  );
};

export default InputModal;
