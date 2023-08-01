import React, { useRef, useState } from "react";
import { routes } from "../utils/routesConsts";
import { Button, Container, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import styles from "./Auth.module.scss";
import { toBase64 } from "../helpers/toBase64";
import { add_new_user_py } from "../eel/eel";
import useAlert from "../hooks/useAlert";

interface RegisterProps {
  setPage: React.Dispatch<React.SetStateAction<routes>>;
}

const RegisterPage: React.FC<RegisterProps> = ({ setPage }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const showAlert = useAlert();

  const chooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const base64 = await toBase64(event.target.files[0]);
    setImage(base64 as string);
  };

  const pickHandler = () => {
    if (!imageRef.current?.files) return;
    imageRef.current.click();
  };

  const createHandler = async () => {
    if (!name) return showAlert("error", "Name required");
    if (!password) return showAlert("error", "Password required");
    if (password !== confirmPassword)
      return showAlert("error", "Passwords don't match");
    await add_new_user_py(name, password, image);
    setPage(routes.LOGIN_ROUTE);
  };

  return (
    <Container
      sx={{
        mt: "130px",
        display: "flex",
        justifyContent: "center",
        maxWidth: "280px",
      }}
    >
      <div>
        <input
          className={styles.Hidden}
          type="file"
          ref={imageRef}
          onChange={chooseImage}
          accept="image/png, image/jpeg"
        />

        {image ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{
                verticalAlign: "middle",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
              alt="avatar"
              src={image}
            />
          </div>
        ) : (
          <div
            className={styles.NewUser}
            style={{ margin: "0 auto" }}
            onClick={pickHandler}
          >
            <CameraAltIcon fontSize="large" />
          </div>
        )}

        <TextField
          size="small"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          size="small"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          size="small"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          sx={{ mt: 2 }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          onClick={createHandler}
        >
          Create
        </Button>
        <div
          style={{
            textAlign: "center",
            color: "#1976d2",
            marginTop: "25px",
            cursor: "pointer",
          }}
          onClick={() => setPage(routes.LOGIN_ROUTE)}
        >
          Go back
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
