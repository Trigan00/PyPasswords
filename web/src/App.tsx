import React from "react";
import AppRouter from "./components/AppRouter";
import MyAlert from "./UI/MyAlert";
import { useTypedSelector } from "./store";

const App: React.FC = () => {
  const myAlert = useTypedSelector((state) => state.alert);

  return (
    <>
      <AppRouter />
      <MyAlert
        message={myAlert.message}
        open={myAlert.isOpen}
        severity={myAlert.severity}
        duration={myAlert.duration}
      />
    </>
  );
};

export default App;
