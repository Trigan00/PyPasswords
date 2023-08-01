import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useAlert from "../hooks/useAlert";
import MyModal from "../UI/MyModal";
import { delete_password_py } from "../eel/eel";
import { useTypedDispatch, useTypedSelector } from "../store";
import { fetchPasswords } from "../store/passwordsReducer";

interface DeleteModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  id: number;
}

const DeletePassword: React.FC<DeleteModalProps> = ({
  isModal,
  setIsModal,
  title,
  id,
}) => {
  const showAlert = useAlert();
  const [deleteIsActive, setDeleteIsActive] = useState(false);
  const dispatch = useTypedDispatch();
  const { name } = useTypedSelector((state) => state.user);

  const onDelete = async () => {
    const { data } = await delete_password_py(name, id);
    showAlert("success", data, 2000);
    dispatch(fetchPasswords());
    setIsModal(false);
  };

  return (
    <MyModal isModal={isModal} setIsModal={setIsModal}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Удалить пароль?
        </Typography>
        <CloseIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setIsModal(false)}
        />
      </div>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Пароль &#171;{title}&#187; будет удален без возможности восстановления
      </Typography>
      <Typography sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={deleteIsActive}
              onChange={() => setDeleteIsActive((prev) => !prev)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={"Удалить пароль"}
        />
      </Typography>
      <div style={{ marginTop: "20px", float: "right" }}>
        <>
          <Button
            size="small"
            style={{ marginRight: "10px" }}
            onClick={() => setIsModal(false)}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            disabled={!deleteIsActive}
            onClick={() => {
              onDelete();
              setDeleteIsActive(false);
              setIsModal(false);
            }}
          >
            Удалить
          </Button>
        </>
      </div>
    </MyModal>
  );
};

export default DeletePassword;
