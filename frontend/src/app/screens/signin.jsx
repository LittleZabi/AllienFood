import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserError, getUserStatus, signIn } from "../../store/userSlice"
import LoadingSpin from '../components/loading-spin'
import Message from '../components/message'
const SignIn = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(false)
    const dispatch = useDispatch()
    const signUserStatus = useSelector(getUserStatus)
    const userDetails = useSelector(getUser)
    const [loading, setLoading] = useState(false)
    const redirect = useLocation().search.split('redirect=')[1] || '/'
    const handleForm = e => {
        e.preventDefault();
        if (email === '') {
            setMessage({ type: 'alert', message: 'Email is empty enter your email address...' })
        } else if (password === '') {
            setMessage({ type: 'alert', message: 'Password is empty enter your password...' })
        }
        const canSave = password && email
        if (canSave) {
            dispatch(signIn({ email, password }))
        }
    }
    useEffect(() => {
        if (signUserStatus === 'pending') {
            setLoading(true)
        }
        if (signUserStatus === 'complete' || signUserStatus === 'error') {
            setLoading(false)
        }
        if (userDetails.status && userDetails.status === 200) {
            setMessage({ type: 'success', message: `User logged successfully! Redirecting to ${redirect === '/' ? 'Foods Menu' : redirect}` })
            setTimeout(() => {
                navigate(redirect === '/' ? redirect : '/' + redirect)
            }, 1000);
        } else if (userDetails.status && userDetails.status === 401) {
            setMessage({ type: 'error', message: `error ${401} Unauthorized user. email or password is incorrect!` })
        }
    }, [signUserStatus])
    return (
        <>
            {
                message && <Message handleClose={() => setMessage(false)} message={message.message} variant={message.type} />
            }
            <div className="mt-x fading">
                <form className="form" onSubmit={handleForm}>
                    <span className="title">Login into your account</span>
                    <span className="label">Enter your Email address</span>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter address..." />
                    <span className="label">Enter your Password.</span>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." />
                    {
                        loading === true ? <LoadingSpin /> : <input type="submit" value="Login" />
                    }

                    <div className="flex">
                        <input type="checkbox" className="submit" defaultChecked />
                        <span>keep logged</span>
                    </div>
                    <span className="not-have-account">Not have any account <Link to={`/signup?redirect=${redirect}`}>Register now!</Link></span>
                </form>
            </div>
        </>)
}

export default SignIn