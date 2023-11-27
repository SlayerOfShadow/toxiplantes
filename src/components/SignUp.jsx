import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form">
      <h1 className="form-title">Créer un compte</h1>
      <form className="form-content" onSubmit={signUp}>
        <input
          type="email"
          placeholder="exemple@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default SignUp;
