import React from 'react';

const LoginPage = () => {
  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <div>
        <a href="http://localhost:5000/auth/google">Login with Google</a>
      </div>
      <div>
        <a href="http://localhost:5000/auth/github">Login with GitHub</a>
      </div>
      <div>
        <a href="http://localhost:5000/auth/facebook">Login with Facebook</a>
      </div>
    </div>
  );
};
export default LoginPage;


