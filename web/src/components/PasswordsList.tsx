import React from "react";
import { useTypedSelector } from "../store";
import PasswordCard from "./PasswordCard";
import { Password } from "../eel/eel.interface";

const PasswordsList: React.FC = () => {
  const { passwords, searchTerm } = useTypedSelector(
    (state) => state.passwords
  );

  const filteredPasswords: Password[] = searchTerm
    ? passwords.filter((el) =>
        el.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : passwords;

  return (
    <div>
      {filteredPasswords.length ? (
        filteredPasswords.map((password, i) => (
          <PasswordCard key={password.id} password={password} index={i} />
        ))
      ) : (
        <h3>Password list is empty</h3>
      )}
    </div>
  );
};

export default PasswordsList;
