enum actions {
  SET_USER = "SET_USER",
  REMOVE_USER = "REMOVE_USER",
}

interface setUserAction {
  name: string;
  secret: string;
}

interface actionType {
  type: actions;
  payload: setUserAction;
}

const initialState: {
  name: string;
  secret: string;
} = {
  name: "",
  secret: "",
};

export const userReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...action.payload };
    case actions.REMOVE_USER:
      return { ...initialState };
    default:
      return state;
  }
};

export const setUser = (payload: setUserAction) => {
  return {
    type: actions.SET_USER,
    payload,
  };
};

export const removeUser = () => {
  return {
    type: actions.REMOVE_USER,
  };
};
