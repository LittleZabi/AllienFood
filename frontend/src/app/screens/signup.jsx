import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserStatus, signUp } from "../../store/userSlice"
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
        setMessage(false)
        console.log(userInfo)
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

    const handleProfilePic = (e) => {
        handleInputs({ avatar: e.target.files[0], 'avatar-name': e.target.files[0].name })
        try {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                let imageView = document.getElementById('profile-image-div')
                imageView.innerHTML = ''
                let img = document.createElement('img')
                img.src = e.currentTarget.result
                imageView.appendChild(img)
            }
        } catch (error) {
            console.error(error.message)
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
                } else {
                    setMessage({ type: 'alert', message: userDetails.user.message })
                }
            } catch (error) {
                setMessage({ type: 'alert', message: 'Error occured try again later.' })
            }
        } else if (userDetails.status && userDetails.status === 200) {
            setMessage({ type: 'success', message: `User logged successfully! Redirecting to ${redirect === '/' ? 'Foods Menu' : redirect}` })
            setTimeout(() => {
                window.location.href = '/'
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
                <div className='container page-size fading profile'>
                    <div className='left bg' style={{ backgroundImage: 'url(media/images/lidya-nada-3o5dq.jpg)' }}>
                        <div className='profile-title'>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='right-profile'>
                            <h3>Create Account</h3>
                            <form onSubmit={handleForm}>
                                <div className="flex">
                                    <div className="image-container">
                                        <div className="file-upload">
                                            <input onChange={handleProfilePic} type="file" name="user-image" id="user-image" />
                                            <div id='profile-image-div'>

                                                <i className="fa fa-user"></i>
                                                <span>Select Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">

                                    <div>
                                        <label htmlFor="fullname">Full Name</label>
                                        <input onChange={(e) => handleInputs({ name: e.target.value })} type="text" id='fullname' placeholder='eg. John doe' />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input onChange={(e) => handleInputs({ email: e.target.value })} type="email" id='email' placeholder='eg. johndoe@example.com' />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input onChange={(e) => handleInputs({ pass: e.target.value })} type="password" id='password' placeholder='pick a hard password' />
                                    </div>

                                    <div>
                                        <label htmlFor="repassword">Re-Password</label>
                                        <input type="password" id='repassword' onChange={(e) => handleInputs({ repass: e.target.value })} placeholder='Re type your password' />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div>
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="text" id='phone' onChange={(e) => handleInputs({ phone: e.target.value })} placeholder='eg. +129348593' />
                                    </div>

                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id='address' onChange={(e) => handleInputs({ address: e.target.value })} placeholder='eg. ST Blueterminal, 725 Ave New York' />
                                    </div>
                                </div>
                                <button type="submit">Sign Up</button>
                                <input type="reset" value="Reset All" />
                                <span className="account-status">Have already <Link to={`/signin?redirect=${redirect}`}>Account!</Link></span>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        </>)
}

export default SignUp