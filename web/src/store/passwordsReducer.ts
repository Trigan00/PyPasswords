import { AppDispatch } from ".";
import { get_all_passwords_py } from "../eel/eel";
import { Password } from "../eel/eel.interface";

enum actions {
  SET_PASSWORDS = "SET_PASSWORDS",
  SET_SEARCH_TERM = "SET_SEARCH_TERM",
}

interface actionType {
  type: actions;
  payload: {
    passwords: Password[];
    searchTerm: string;
  };
}

const initialState: {
  passwords: Password[];
  searchTerm: "";
} = {
  passwords: [],
  searchTerm: "",
};

export const passwordsReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actions.SET_PASSWORDS:
      return { passwords: action.payload.passwords };
    case actions.SET_SEARCH_TERM:
      return {
        passwords: state.passwords,
        searchTerm: action.payload.searchTerm,
      };
    default:
      return state;
  }
};

const setPasswords = (payload: { passwords: Password[] }) => {
  return {
    type: actions.SET_PASSWORDS,
    payload,
  };
};

export const setSearchTerm = (payload: { searchTerm: string }) => {
  return {
    type: actions.SET_SEARCH_TERM,
    payload,
  };
};

export const fetchPasswords =
  (): any => async (dispatch: AppDispatch, getState: Function) => {
    const state = getState();
    const { data } = await get_all_passwords_py(state.user.name);
    dispatch(
      setPasswords({
        passwords: data,
      })
    );
  };
