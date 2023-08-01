import React, { useEffect, useState } from "react";
import { routes } from "../utils/routesConsts";
import AddPassword from "../components/AddPassword";
import { useTypedDispatch } from "../store";
import PasswordsList from "../components/PasswordsList";
import { fetchPasswords } from "../store/passwordsReducer";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";

interface HomeProps {
  setPage: React.Dispatch<React.SetStateAction<routes>>;
}

const HomePage: React.FC<HomeProps> = ({ setPage }) => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(fetchPasswords());
  }, []);

  const [isAddPassword, setIsAddPassword] = useState(false);
  return (
    <div>
      <NavBar setPage={setPage} />
      <Box sx={{ mt: "35px", display: "flex", justifyContent: "center" }}>
        <PasswordsList />
      </Box>
      <AddPassword isModal={isAddPassword} setIsModal={setIsAddPassword} />
    </div>
  );
};

export default HomePage;
