import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <div className="Login-body">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button>OK</button>
      </div>
    </React.Fragment>
  );
}
