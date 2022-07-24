
import { Link } from 'react-router-dom'
const Header = ({ cartItems, user }) => {
    return (
        <header className="row page-size fading" style={{ backgroundImage: "url('/images/sara-dubler-i4z0t.jpg')", color: 'blue' }}>

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
                                    <li>
                                        <Link to="/shipping">
                                            Shipping
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