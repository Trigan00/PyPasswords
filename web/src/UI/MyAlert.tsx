import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";
import { useTypedDispatch } from "../store";
import { removeAlert } from "../store/alertReducer";

interface AlertProps {
  message: string | null;
  open: boolean;
  severity: AlertColor | undefined;
  duration: number;
}

const MyAlert: React.FC<AlertProps> = ({
  message,
  open,
  severity,
  duration,
}) => {
  const dispatch = useTypedDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeAlert());
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
