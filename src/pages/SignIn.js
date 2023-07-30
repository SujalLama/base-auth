import { useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { signIn } from "../api/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const response = await signIn(email, password);

        if(response.status === 400) {
            return setError(response.msg)
        }

        localStorage.setItem('user', JSON.stringify(response.user));

        navigate('/protected')
    }

  return (
    <>
    <h2>SignIn Form</h2>
    {error && <h3>{error}</h3>}
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor="email">Email</label>
            <Input ref={emailRef} type="email" name="email" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <Input ref={passwordRef} type="password" name="password" />
        </div>
        <Button>Login</Button>
    </form>
    <p>Don't have an account. <Link to="/sign-up">Click Here.</Link></p>
    </>
  )
}
