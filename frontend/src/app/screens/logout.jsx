import { userLogout } from "../../store/userSlice"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserStatus, signIn } from "../../store/userSlice"
import Message from '../components/message'
const SignOut = () => {
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
                window.location.href = redirect === '/' ? redirect : '/' + redirect
            }, 800);
        } else if (userDetails.status && userDetails.status === 401) {
            setMessage({ type: 'error', message: `error ${401} Unauthorized user. email or password is incorrect!` })

        }
    }, [signUserStatus])
    const LogoutView = () => {
        const handleLogout = () => {
            dispatch(userLogout())
            navigate('/signIn')
        }
        return (<>
            <div className="logout">
                <span className="title">Sign Out from my account</span>
                <button onClick={handleLogout}>Sign out </button>
                <span className="sub-title">Login with another <Link to="/signup">Account!</Link></span>
            </div>
        </>)
    }

    return (
        <>
            {
                message && <Message handleClose={() => setMessage(false)} message={message.message} variant={message.type} />
            }
            <div className="mt-x fading">
                <div className='container page-size fading profile sign-in'>
                    <div className='left bg' style={{ backgroundImage: 'url(/media/images/sam-moghadam-cndhr.jpg)' }}>
                        <LogoutView />
                    </div>
                    <div className='right'>

                        <div className='right-profile'>
                            <h3>use another account</h3>
                            <form onSubmit={handleForm}>
                                <div className="flex">
                                    <i className="fa fa-envelope"></i>
                                    <label htmlFor="email">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' placeholder='eg. johndoe@example.com' />
                                </div>
                                <div className="flex">
                                    <i className="fa fa-lock"></i>
                                    <label htmlFor="password">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' placeholder='eg. your password' />
                                </div>
                                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login Now"}</button>
                                <input type="reset" value="Reset All" />
                                <span className="account-status">Create new <Link to={`/signup?redirect=${redirect}`}>account!</Link></span>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        </>)
}

export default SignOut