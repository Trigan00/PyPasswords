import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { login_py } from "../eel/eel";
import { routes } from "../utils/routesConsts";
import useAlert from "../hooks/useAlert";
import { useTypedDispatch } from "../store";
import { setUser } from "../store/userReducer";
import MyModal from "../UI/MyModal";

interface PasswordEnterProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setPage: React.Dispatch<React.SetStateAction<routes>>;
}

const PasswordEnter: React.FC<PasswordEnterProps> = ({
  isModal,
  setIsModal,
  name,
  setPage,
}) => {
  const [password, setPassword] = useState("");
  const showAlert = useAlert();
  const dispatch = useTypedDispatch();

  const clickHandler = async () => {
    const data = await login_py(name, password);
    if (data.error) return showAlert("error", data.error);
    dispatch(setUser(data.data));
    setPage(routes.HOME_ROUTE);
  };

  return (
    <MyModal isModal={isModal} setIsModal={setIsModal}>
      <TextField
        size="small"
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        fullWidth
        onClick={clickHandler}
      >
        Enter
      </Button>
    </MyModal>
  );
};

export default PasswordEnter;
