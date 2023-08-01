import React, { useState } from "react";
import { useTypedDispatch } from "../store";
import styles from "./NavBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { removeUser } from "../store/userReducer";
import { routes } from "../utils/routesConsts";
import { setSearchTerm } from "../store/passwordsReducer";

interface NavBarProps {
  setPage: React.Dispatch<React.SetStateAction<routes>>;
}

const NavBar: React.FC<NavBarProps> = ({ setPage }) => {
  const [value, setValue] = useState("");
  const dispatch = useTypedDispatch();

  const exitHandler = () => {
    dispatch(removeUser());
    setPage(routes.LOGIN_ROUTE);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(setSearchTerm({ searchTerm: event.target.value }));
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Search}>
        <div className={styles.Icon}>
          <SearchIcon />
        </div>
        <input value={value} onChange={changeHandler} placeholder="Search" />
      </div>
      <div className={styles.Exit} onClick={exitHandler}>
        <PowerSettingsNewIcon fontSize="small" />
      </div>
    </div>
  );
};

export default NavBar;
