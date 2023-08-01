import React, { useState } from "react";
import styles from "./AddPassword.module.scss";
import AddIcon from "@mui/icons-material/Add";
import MyModal from "../UI/MyModal";
import {
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Box,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { add_new_pass_py, gen_password_py } from "../eel/eel";
import { useTypedDispatch, useTypedSelector } from "../store";
import { fetchPasswords } from "../store/passwordsReducer";

interface AddPasswordProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPassword: React.FC<AddPasswordProps> = ({ isModal, setIsModal }) => {
  const [form, setForm] = useState({
    title: "",
    login: "",
    password: "",
    url: "",
  });
  const [isWebSite, setIsWebSite] = useState(false);
  const dispatch = useTypedDispatch();
  const { secret, name } = useTypedSelector((state) => state.user);

  const createHandler = async () => {
    await add_new_pass_py({ ...form, secret }, name);
    dispatch(fetchPasswords());
    setForm({
      title: "",
      login: "",
      password: "",
      url: "",
    });
    setIsModal(false);
  };

  const generatePasswordHandler = async () => {
    const { data } = await gen_password_py();
    setForm((prev) => Object({ ...prev, password: data }));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => Object({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className={styles.NewPass} onClick={() => setIsModal(true)}>
        <AddIcon fontSize="large" />
      </div>

      <MyModal isModal={isModal} setIsModal={setIsModal}>
        <TextField
          variant="outlined"
          fullWidth
          name="title"
          size="small"
          label="Title"
          sx={{ mb: 2 }}
          value={form.title}
          onChange={changeHandler}
        />
        <TextField
          variant="outlined"
          fullWidth
          name="login"
          size="small"
          label="Login"
          sx={{ mb: 2 }}
          value={form.login}
          onChange={changeHandler}
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            size="small"
            label="Password"
            value={form.password}
            onChange={changeHandler}
          />
          <AutoFixHighIcon
            sx={{ ml: 1, cursor: "pointer", color: "grey" }}
            onClick={generatePasswordHandler}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={isWebSite}
              onChange={() => setIsWebSite((prev) => !prev)}
            />
          }
          label="Is website"
        />
        <TextField
          variant="outlined"
          fullWidth
          name="url"
          size="small"
          label="URL"
          sx={{ mb: 2 }}
          disabled={!isWebSite}
          value={form.url}
          onChange={changeHandler}
        />

        <Button
          variant="contained"
          sx={{ mt: 1 }}
          fullWidth
          onClick={createHandler}
        >
          ADD
        </Button>
      </MyModal>
    </>
  );
};

export default AddPassword;
