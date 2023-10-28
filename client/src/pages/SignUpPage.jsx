import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert("Succesfull Sign In");
        navigate('/');
      } else {
        console.error('Failed to Login');
        alert("Already Sign Up, Go to the Login Page!")
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <main className='grid w-full h-[100vh] bg-[#1A1818] place-items-center'>
        <div className='flex flex-col items-center justify-center gap-16'>
          <p className='text-[#9C9837] text-7xl'>Sign Up</p>
          <form className="flex flex-col w-[504px] gap-2 " onSubmit={onSubmitForm}>
            <input className="p-1 border-white rounded-lg border-" type="text" placeholder="Nama" value={username} onChange={e => setUsername(e.target.value)} />
            <input className="p-1 border-2 border-white rounded-lg" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="p-1 border-2 border-white rounded-lg" type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <p className='self-end text-white'>Lupa Password?</p>
            <button className="p-1 rounded-lg text-white bg-[#9C9837]" type='button' onClick={onSubmitForm}>Submit</button>
          </form>
        </div>
      </main>
     
    </>
  );
}

export default SignUpPage;
