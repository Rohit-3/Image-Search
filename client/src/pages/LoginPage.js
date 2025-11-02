import React from 'react';

const LoginPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur p-10 text-center shadow-xl">
        <h2 className="text-3xl font-bold tracking-tight">MERN Image Search</h2>
        <p className="text-slate-400 mt-2">Sign in to continue</p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <a className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium shadow-lg shadow-blue-600/30" href="http://localhost:5000/auth/google">Login with Google</a>
          <a className="inline-flex items-center rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-medium" href="http://localhost:5000/auth/github">Login with GitHub</a>
          <a className="inline-flex items-center rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium" href="http://localhost:5000/auth/facebook">Login with Facebook</a>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;


