import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session'
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoClick = () => {
    dispatch(sessionActions.login('demo@aa.io', 'password'))
    history.push('/recipes')
    closeModal()
  }

  // return (
  //   <>
  //     <h1>Log In</h1>
  //     <form onSubmit={handleSubmit}>
  //       <ul>
  //         {errors.map((error, idx) => (
  //           <li key={idx}>{error}</li>
  //         ))}
  //       </ul>
  //       <label>
  //         Email
  //         <input
  //           type="text"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </label>
  return (
    <div className="login-page">
      {/* <img className="login-image" src='https://bakingamoment.com/wp-content/uploads/2021/02/IMG_9987-flourless-chocolate-cake.jpg' /> */}
      <div className="login-modal">
        <h1>Log In</h1>
        <p>Enter your email address and password to log in or sign up to create an account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email:
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" disabled={!email || !password}>Log In</button>
          <br />
          <div className="login-modal-demo">
            <button onClick={() => demoClick()}>Demo User</button>
          </div>
          <br />

          <div className="login-form-signup">
            <OpenModalButton
              buttonText="Don't have an account? Sign up!"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              loginModalClass='login'
            />
          <br />

          <br />

          </div>

        </form>
      </div>
    </div >
  );
}

export default LoginFormModal;
