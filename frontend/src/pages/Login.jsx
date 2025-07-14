import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email || !password) {
      setError('Both fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const user = res.data.user;
      localStorage.setItem('userId', user.id);
      localStorage.setItem('role', user.role);

      if (user.role === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/tenant-dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p className="message error">{error}</p>}
        </form>
        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;





// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Added useLocation
// import './Auth.css';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ Get previous location

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/login', {
//         email,
//         password,
//       });
//       const user = res.data.user;

//       localStorage.setItem('userId', user.id);
//       localStorage.setItem('role', user.role);

//       // ✅ Redirect logic
//       const from = location.state?.from || (user.role === 'owner' ? '/owner-dashboard' : '/tenant-dashboard');
//       navigate(from);
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-box">
//         <h2 className="auth-title">Login</h2>
//         <form className="auth-form" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Login</button>
//           {error && <p className="message error">{error}</p>}
//         </form>
//         <p className="auth-footer">
//           Don't have an account? <a href="/signup">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
