import { useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { signIn, signUp } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../api/users";

export default function SignUp() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const password2 = password2Ref.current.value;

        if(password !== password2) {
            return setError('Both password must be same.')
        }

        const response = await signUp(email, password);

        if(response.status === 400) {
            return setError(response.msg)
        }

        // creating user in a users collection
        const user = await createUser(response.user);
        console.log(user);

        // localStorage.setItem('user', JSON.stringify(response.user));
        // navigate('/protected')
    }

    return (
        <>
        <h2>SignUp Form</h2>
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
            <div>
                <label htmlFor="password2">Re-Password</label>
                <Input ref={password2Ref} type="password" name="password2" />
            </div>
            <Button>Register</Button>
        </form>
        <p>Already have an account! <Link to="/sign-in">Click Here.</Link></p>
        </>
    )
}
