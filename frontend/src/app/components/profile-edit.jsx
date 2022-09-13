import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserStatus, updateProfile } from "../../store/userSlice"
import Message from '../components/message'
const ProfileEdit = ({ user }) => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(user)
    const [message, setMessage] = useState(false)
    const dispatch = useDispatch()
    const signUserStatus = useSelector(getUserStatus)
    const userDetails = useSelector(getUser)
    const [loading, setLoading] = useState(false)
    const redirect = useLocation().search.split('redirect=')[1] || '/'
    const handleForm = e => {
        e.preventDefault();
        setMessage(false)
        const validate = validateInputs(userInfo);
        if (validate !== 'OK') {
            setMessage({ type: 'alert', message: validate })
        } else {
            dispatch(updateProfile({ ...userInfo, token: user.token, _id: user._id, old_avatar: user.avatar }))
        }
    }
    const validateInputs = value => {
        if (!value.name || value.name === '') {
            return 'Enter your name.'
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
                console.error('server: ', userDetails.user.message)
                console.error('browser: ', error.message)
                setMessage({ type: 'alert', message: 'Error occured try again later.' })
            }
        } else if (userDetails.status && userDetails.status === 200) {
            setMessage({ type: 'success', message: `User logged successfully! Redirecting to ${redirect === '/' ? 'Foods Menu' : redirect}` })
            setTimeout(() => {
                window.location.href = '/'
            }, 800);
        } else if (userDetails.status && userDetails.status === 401) {
            setMessage({ type: 'error', message: `Error occured during register user.` })
        }
    }, [signUserStatus])
    return <>
        {
            message && <Message handleClose={() => setMessage(false)} message={message.message} variant={message.type} />
        }

        <div className='right-profile'>
            <h3>Account Setting</h3>
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
                        <input defaultValue={user.name} onChange={(e) => handleInputs({ name: e.target.value })} type="text" id='fullname' placeholder='eg. John doe' />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input disabled defaultValue={user.email} type="email" id='email' placeholder='eg. johndoe@example.com' />
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" defaultValue={user.phone} id='phone' onChange={(e) => handleInputs({ phone: e.target.value })} placeholder='eg. +129348593' />
                    </div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" defaultValue={user.address} id='address' onChange={(e) => handleInputs({ address: e.target.value })} placeholder='eg. ST Blueterminal, 725 Ave New York' />
                    </div>
                </div>
                <button type="submit">Update</button>
                <input type="reset" value="Reset All" />
            </form>
        </div>
    </>
}

export default ProfileEdit