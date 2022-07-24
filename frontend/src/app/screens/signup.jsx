import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserError, getUserStatus, signUp } from "../../store/userSlice"
import LoadingSpin from '../components/loading-spin'
import Message from '../components/message'
const SignUp = (props) => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState()
    const [message, setMessage] = useState(false)
    const dispatch = useDispatch()
    const signUserStatus = useSelector(getUserStatus)
    const userDetails = useSelector(getUser)
    const [loading, setLoading] = useState(false)
    const redirect = useLocation().search.split('redirect=')[1] || '/'
    const handleForm = e => {
        e.preventDefault();
        const validate = validateInputs(userInfo);
        if (validate !== 'OK') {
            setMessage({ type: 'alert', message: validate })
        } else {
            dispatch(signUp(userInfo))
        }
    }
    const validateInputs = value => {
        if (!value.name || value.name === '') {
            return 'Enter your name.'
        } else if (!value.email || value.email === '') {
            return 'Enter your email address.'
        } else if (!value.pass || value.pass === '') {
            return 'Enter your password.'
        } else if (value.pass !== value.repass) {
            return 'Password is not match.'
        } else {
            return 'OK'
        }
    }
    const handleInputs = (value) => setUserInfo({ ...userInfo, ...value })
    useEffect(() => {
        if (signUserStatus === 'pending') {
            setLoading(true)
        }
        if (signUserStatus === 'complete' || signUserStatus === 'error') {
            setLoading(false)
        }
        if (userDetails.user && userDetails.user.message) {
            try {
                if (userDetails.user.message.indexOf('E11000') > -1) {
                    setMessage({ type: 'alert', message: 'Email is already exist use another email or login with this email address.' })
                }
            } catch (error) {
                console.error('server: ', userDetails.user.message)
                console.error('browser: ', error.message)
                setMessage({ type: 'alert', message: 'Error occured try again later.' })
            }
        } else if (userDetails.status && userDetails.status === 200) {
            setMessage({ type: 'success', message: `User logged successfully! Redirecting to ${redirect === '/' ? 'Foods Menu' : redirect}` })
            setTimeout(() => {
                navigate(redirect === '/' ? redirect : '/' + redirect)
            }, 1200);
        } else if (userDetails.status && userDetails.status === 401) {
            setMessage({ type: 'error', message: `Error occured during register user.` })
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
                    <span className="label">Enter your fullname</span>
                    <input type="text" onChange={(e) => handleInputs({ name: e.target.value })} placeholder="Enter fullname..." />
                    <span className="label">Enter your Email address</span>
                    <input type="text" onChange={(e) => handleInputs({ email: e.target.value })} placeholder="Enter address..." />
                    <span className="label">Enter your Password.</span>
                    <input type="password" onChange={(e) => handleInputs({ pass: e.target.value })} placeholder="Enter password..." />
                    <span className="label">Re-Enter your Password.</span>
                    <input type="password" onChange={(e) => handleInputs({ repass: e.target.value })} placeholder="enter again your password..." />
                    {
                        loading === true ? <LoadingSpin /> : <input type="submit" value="Login" />
                    }
                    <div className="flex">
                        <input type="checkbox" className="submit" defaultChecked />
                        <span>keep logged</span>
                    </div>
                    <span className="not-have-account">Have already <Link to={`/signin?redirect=${redirect}`}>Account!</Link></span>
                </form>
            </div>
        </>)
}

export default SignUp