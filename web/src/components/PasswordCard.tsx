import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import styles from "./PasswordCard.module.scss";
import { Password } from "../eel/eel.interface";
import DeletePassword from "./DeletePassword";
import PasswordInfo from "./PasswordInfo";

interface PasswordCardProps {
  index: number;
  password: Password;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ password, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isPasswordInfo, setIsPasswordInfo] = useState(false);

  return (
    <div className={styles.Wrapper}>
      <Box className={styles.Card}>
        <Box
          sx={{ width: "100%", cursor: "pointer", p: 1 }}
          onClick={() => setIsPasswordInfo(true)}
        >
          {index + 1}. {password.title}
        </Box>
      </Box>
      <DeleteIcon
        className={styles.DeleteIcon}
        onClick={() => setIsDelete(true)}
      />

      {isDelete && (
        <DeletePassword
          id={password.id}
          isModal={isDelete}
          setIsModal={setIsDelete}
          title={password.title}
        />
      )}

      {isPasswordInfo && (
        <PasswordInfo
          id={password.id}
          isModal={isPasswordInfo}
          setIsModal={setIsPasswordInfo}
        />
      )}
    </div>
  );
};

export default PasswordCard;
