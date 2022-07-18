
const Header = () => {
    return (
        <header className="row page-size fading" style={{ backgroundImage: "url('/images/sara-dubler-i4z0t.jpg')", color: 'blue' }}>

            <nav className="page-size">
                <div>
                    <a className="brand" href="/">
                        AllienFood <i className="fas fa-mug-hot"></i>
                    </a>
                </div>
                <div>
                    <a href="cart.html" className="cart">
                        <i className="fa fa-cart-shopping"></i>
                        <span className="badge">999</span>
                    </a>
                    <a href="siginin.html" className="user-btn">
                        <i className="fa fa-user"></i>Sign in
                    </a>
                </div>
            </nav>
        </header>)
}
export default Header