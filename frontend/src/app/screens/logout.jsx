import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userLogout } from "../../store/userSlice"
const SignOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(userLogout())
        navigate('/signIn')
    }
    return (
        <>
            <div className="mt-x fading">
                <div className="form" >
                    <span className="title">Sign Out from my account</span>
                    <button onClick={handleLogout}>Sign out </button>
                    <span className="not-have-account">Login with another <Link to="/signup">Account!</Link></span>
                </div>
            </div>
        </>)
}

export default SignOut