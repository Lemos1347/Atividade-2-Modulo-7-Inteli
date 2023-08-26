export const routes = {
  home: "/",
  auth: {
    login: "/auth/login",
  },
  user: {
    create: "/user/create",
    get: `/user/`,
    update: `/id`,
    delete: `/id`,
  },
  admin: {
    set: (id: string) => `/admin/set/${id}`,
    users: "/admin/all",
    remove: (id: string) => `/admin/remove/${id}`,
    get: (id: string) => `/admin/${id}`,
    updateInfo: (id: string) => `/admin/${id}`,
    delete: (id: string) => `/admin/${id}`,
  },
  pokemon: {
    create: "/pokemon/create",
    get: `/pokemon/`,
    updateNickName: (id: string) => `/pokemon/${id}`,
    delete: (id: string) => `/pokemon/${id}`,
  },
};
