import React, { useState } from "react";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { routes } from "../utils/routesConsts";

const AppRouter = () => {
  const [page, setPage] = useState<routes>(routes.LOGIN_ROUTE);

  if (page === routes.HOME_ROUTE) return <HomePage setPage={setPage} />;
  if (page === routes.REGISTRATION_ROUTE)
    return <RegisterPage setPage={setPage} />;
  return <LoginPage setPage={setPage} />;
};

export default AppRouter;
