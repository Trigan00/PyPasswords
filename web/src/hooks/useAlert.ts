import { AlertColor } from "@mui/material";
import { useCallback } from "react";
import { setAlert } from "../store/alertReducer";
import { useTypedDispatch } from "../store";

const useAlert = () => {
  const dispatch = useTypedDispatch();

  const showAlert = useCallback(
    (severity: AlertColor, message: string, duration: number = 4000) => {
      return dispatch(
        setAlert({
          severity,
          message,
          duration,
        })
      );
    },
    [dispatch]
  );
  return showAlert;
};

export default useAlert;
