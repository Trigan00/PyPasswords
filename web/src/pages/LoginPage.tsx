import React, { useEffect, useState } from "react";
import { routes } from "../utils/routesConsts";
import { Container } from "@mui/material";
import { get_all_py } from "../eel/eel";
import styles from "./Auth.module.scss";
import PasswordEnter from "../components/PasswordEnter";
import { User } from "../eel/eel.interface";

interface LoginProps {
  setPage: React.Dispatch<React.SetStateAction<routes>>;
}

const LoginPage: React.FC<LoginProps> = ({ setPage }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    (async function name() {
      const users = await get_all_py();
      setUsers(users.data);
    })();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "200px",
      }}
    >
      <div style={{ display: "flex", maxWidth: "600px", flexWrap: "wrap" }}>
        {users.map((el) => (
          <div key={el.name} className={styles.Logo}>
            {el.image ? (
              <img
                style={{
                  verticalAlign: "middle",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
                alt={el.name}
                src={el.image}
                onClick={() => {
                  setName(el.name);
                  setIsModal(true);
                }}
              />
            ) : (
              <div
                className={styles.NewUser}
                onClick={() => {
                  setName(el.name);
                  setIsModal(true);
                }}
              >
                <div>{el.name[0].toUpperCase()}</div>
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {el.name}
            </div>
          </div>
        ))}
        <div
          className={styles.NewUser}
          style={{
            border: "3px solid #2e8ae7",
          }}
          onClick={() => setPage(routes.REGISTRATION_ROUTE)}
        >
          <div style={{ color: "#2e8ae7" }}>+</div>
        </div>
      </div>
      <PasswordEnter
        isModal={isModal}
        setIsModal={setIsModal}
        name={name}
        setPage={setPage}
      />
    </Container>
  );
};

export default LoginPage;
