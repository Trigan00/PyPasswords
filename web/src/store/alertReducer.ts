import { AlertColor } from "@mui/material";

enum actions {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
}

interface setAlertAction {
  severity: AlertColor;
  message: string;
  duration: number;
}

interface actionType {
  type: actions;
  payload: setAlertAction | null;
}

const initialState: {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
  duration: number;
} = {
  isOpen: false,
  severity: undefined,
  message: null,
  duration: 4000,
};

export const alertReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actions.SET_ALERT:
      return { ...action.payload, isOpen: true };
    case actions.REMOVE_ALERT:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export const setAlert = (payload: setAlertAction) => {
  return {
    type: actions.SET_ALERT,
    payload,
  };
};

export const removeAlert = () => {
  return {
    type: actions.REMOVE_ALERT,
  };
};
