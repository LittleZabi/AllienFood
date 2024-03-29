
import { Link } from 'react-router-dom'
const Header = ({ cartItems, user }) => {
    return (
        <header className="row page-size fading">

            <nav className="page-size">
                <div>
                    <Link className="brand" to="/">
                        AllienFood <i className="fas fa-mug-hot"></i>
                    </Link>
                </div>
                <div className='search-bar'>
                    <input type="text" placeholder='Search in your favourite Restaurant...' name="" id="" />
                    <i className="fa fa-search"></i>
                </div>
                <div className='kxnw'>
                    <Link to="/cart" className="cart">
                        <i className="fa fa-cart-shopping"></i>
                        <span className="badge">{cartItems.length}</span>
                    </Link>
                    {
                        user && user._id ? <>
                            <Link to="/logout" className="user-btn">
                                <i className="fa fa-user"></i>{user.name}
                            </Link>
                            <div className='dropdown'>
                                <Link to="#" className='aa-bb'>
                                    Menu <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className='menu'>
                                    <div className='arrow-up'>
                                        <span className='span'></span>
                                    </div>
                                    <li>
                                        <Link to="/shipping">
                                            Shipping
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/order-history">
                                            My Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/logout">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </> :
                            <Link to="/signIn" className="user-btn">
                                <i className="fa fa-user"></i>Sign in
                            </Link>
                    }
                </div>
            </nav>
        </header>)
}
export default Header