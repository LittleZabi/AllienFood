import { cartItemsAll } from '../../store/cartSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
    const cartItems = useSelector(cartItemsAll)
    return (
        <header className="row page-size fading" style={{ backgroundImage: "url('/images/sara-dubler-i4z0t.jpg')", color: 'blue' }}>

            <nav className="page-size">
                <div>
                    <a className="brand" href="/">
                        AllienFood <i className="fas fa-mug-hot"></i>
                    </a>
                </div>
                <div className='search-bar'>
                    <input type="text" placeholder='Search in your favourite Restaurant...' name="" id="" />
                    <i className="fa fa-search"></i>
                </div>
                <div>
                    <Link to="/cart" className="cart">
                        <i className="fa fa-cart-shopping"></i>
                        <span className="badge">{cartItems.length}</span>
                    </Link>
                    <Link to="/signIn" className="user-btn">
                        <i className="fa fa-user"></i>Sign in
                    </Link>
                </div>
            </nav>
        </header>)
}
export default Header