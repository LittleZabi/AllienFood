const Header = () => {
    return (
        <header className="row">
            <nav className="page-size">
                <div>
                    <a className="brand" href="/">
                        AllienFood <i className="fas fa-mug-hot"></i>
                    </a>
                </div>
                <div>
                    <a href="cart.html">
                        <i className="fa fa-cart-shopping"></i> Cart
                    </a>
                    <a href="siginin.html">
                        Sign in <i className="fa fa-user"></i>
                    </a>
                </div>
            </nav>
        </header>)
}
export default Header