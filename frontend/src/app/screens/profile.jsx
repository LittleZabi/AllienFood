import { Link } from 'react-router-dom'
import ProfileEdit from '../components/profile-edit'
const Profile = ({ user }) => {
    return (
        <div className='container page-size fading profile'>
            <div className='left'>
                <div className='profile-title profile-setting'>
                    <img src={user && user.avatar != '' ? user.avatar : '/media/users/default.png'} alt="" />
                    <span className="username">{user && user.name}</span>
                </div>
                <ul>
                    <li className='active'>
                        <i className="fa fa-home"></i>
                        Account
                    </li>
                    <li>
                        <i className="fa fa-key"></i>
                        Password
                    </li>
                    <li>
                        <Link to="/order-history/">
                            <i className="fa fa-user"></i>
                            My Orders
                        </Link>
                    </li>

                </ul>
            </div>
            <div className='right'>
                {user && <ProfileEdit user={user} />}
            </div>
        </div >)
}

export default Profile