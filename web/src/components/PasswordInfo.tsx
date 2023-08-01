import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";
import copy from "copy-to-clipboard";
import useAlert from "../hooks/useAlert";
import MyModal from "../UI/MyModal";
import {
  decrypt_password_py,
  gen_password_py,
  update_password_py,
} from "../eel/eel";
import { useTypedDispatch, useTypedSelector } from "../store";
import { fetchPasswords } from "../store/passwordsReducer";

interface PasswordInfoProps {
  id: number;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInfo: React.FC<PasswordInfoProps> = ({
  id,
  isModal,
  setIsModal,
}) => {
  const [form, setForm] = useState({
    title: "",
    login: "",
    password: "",
    url: "",
  });
  const { name, secret } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const showAlert = useAlert();

  useEffect(() => {
    (async () => {
      const { data } = await decrypt_password_py(name, id, secret);
      setForm(data);
    })();
  }, []);

  const saveHandler = async () => {
    const res = await update_password_py({ ...form, id, secret }, name);
    dispatch(fetchPasswords());
    showAlert("success", res.data);
  };

  const generatePasswordHandler = async () => {
    const { data } = await gen_password_py();
    setForm((prev) => Object({ ...prev, password: data }));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyHandler = (
    type: "title" | "login" | "password",
    message: string
  ) => {
    copy(form[type]);
    showAlert("info", message, 1200);
  };

  return (
    <MyModal isModal={isModal} setIsModal={setIsModal}>
      <Box sx={{ maxWidth: "400px", width: "80vw" }}>
        <Typography
          id="transition-modal-title"
          variant="h5"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          {form.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            margin="normal"
            size="small"
            label="Title"
            variant="filled"
            name="title"
            fullWidth
            value={form.title}
            onChange={changeHandler}
          />
          <ContentCopyIcon
            sx={{ ml: 2, color: "grey", cursor: "pointer" }}
            onClick={() => copyHandler("title", "Title is copied")}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            margin="normal"
            size="small"
            label="Login"
            variant="filled"
            name="login"
            fullWidth
            value={form.login}
            onChange={changeHandler}
          />
          <ContentCopyIcon
            sx={{ ml: 2, color: "grey", cursor: "pointer" }}
            onClick={() => copyHandler("login", "Login is copied")}
          />
        </Box>
        {form.url && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              margin="normal"
              size="small"
              label="URL"
              variant="filled"
              name="url"
              fullWidth
              value={form.url}
              onChange={changeHandler}
            />
            <Link href={form.url} target="_blank" rel="noopener noreferrer">
              <LaunchIcon sx={{ ml: 2, color: "grey", cursor: "pointer" }} />
            </Link>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            margin="normal"
            size="small"
            label="Password"
            variant="filled"
            name="password"
            fullWidth
            value={form.password}
            onChange={changeHandler}
          />
          <ContentCopyIcon
            sx={{ ml: 2, color: "grey", cursor: "pointer" }}
            onClick={() => copyHandler("password", "Password is copied")}
          />
        </Box>

        <Box
          fontSize={14}
          color={"#1976d2"}
          sx={{ cursor: "pointer" }}
          onClick={generatePasswordHandler}
        >
          Generate password
        </Box>

        <Box sx={{ mt: 3, float: "right" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => saveHandler()}
          >
            Save
          </Button>
          <Button size="small" sx={{ ml: 1 }} onClick={() => setIsModal(false)}>
            Close
          </Button>
        </Box>
      </Box>
    </MyModal>
  );
};

export default PasswordInfo;
