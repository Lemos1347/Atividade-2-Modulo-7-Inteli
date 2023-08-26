import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateUser from "@/components/CreateUser";
import ProfileCard from "@/components/ProfileCard";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {}

const getAllUsers = async () => {
  try {
    const users = await fetchInstance(routes.admin.users);
    return users;
  } catch {
    redirect("api/auth/signin");
  }
};

const Dashboard: React.FC<Props> = async (props) => {
  const user = await getServerSession(authOptions);

  const users = await getAllUsers();

  return (
    <div className="flex flex-col h-[100vh] gap-10 bg-gray-300">
      <div className="flex gap-10 justify-between h-auto w-[100vw]">
        <h1 className="text-4xl pt-[4vh] px-10 font-medium">
          Welcome back{" "}
          <span className="text-blue-500 text-5xl font-semibold">
            {user?.user?.name}!
          </span>
        </h1>
        <CreateUser />
      </div>
      <div className="flex px-10 bg-gray-300 gap-5 overflow-y-auto grow flex-wrap items-start justify-center">
        {users && users.map((user: any, index: number) => <ProfileCard key={index} user={user} />)}
      </div>
    </div>
  );
};

export default Dashboard;
