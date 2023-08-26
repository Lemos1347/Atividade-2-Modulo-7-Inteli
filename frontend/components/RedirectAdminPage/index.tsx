"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button, { ButtonType } from "../Button";

interface Props {}

const RedirectAdminPage: React.FC<Props> = (props) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/admin/dashboard");
  };

  return (
    <Button
      onClick={onClick}
      theme={ButtonType.CHANGE_PAGE}
      className="text-red-600"
    >
      ÁREA DO ADMIN
    </Button>
  );
};

export default RedirectAdminPage;
