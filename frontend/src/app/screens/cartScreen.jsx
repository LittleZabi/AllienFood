import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { cartItemsAll, updateQtyOnSpecific, removeItemFromCart } from '../../store/cartSlice'
import TimeAgo from '../components/TimeAgo'
export const CartScreen = ({ user }) => {
    const items = useSelector(cartItemsAll)
    const [cartItems, setCartItems] = useState(null)
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState(0)
    const [sortBy, setSortBy] = useState('date')
    useEffect(() => {
        setCartItems(items)
        let p = 0;
        items.map(e => {
            p += e.price * e.quantity
        })
        setTotalPrice(p)
    }, [items])
    const handleSort = (sort) => {
        setSortBy(sort)
        if (sort === 'date') {
            setCartItems([...items].sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }))
        } else if (sort === 'atoz') {
            setCartItems([...items].sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }))
        } else if (sort === 'ztoa') {
            setCartItems([...items].sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            }))
        } else {
            setCartItems(items)
        }
    }
    return (
        <div className='cart-view fading'>
            <div className='inner-view'>
                {
                    cartItems && cartItems.length > 0 && <div className='title-bar'>
                        <div className='sort-btn'>
                            <button onClick={() => { handleSort('date') }} className={sortBy === 'date' ? 'active' : ''} title='Sort by date'><i className="fa fa-sort-amount-asc"></i></button>
                            <button onClick={() => { handleSort('atoz') }} className={sortBy === 'atoz' ? 'active' : ''} title='Sort by a to z'><i className="fa fa-sort-alpha-asc"></i></button>
                            <button onClick={() => { handleSort('ztoa') }} className={sortBy === 'ztoa' ? 'active' : ''} title='Sort by z to a'><i className="fa fa-sort-alpha-desc"></i></button>
                        </div>
                        <div className='cart-title'>
                            <span>
                                Total ${totalPrice} of {cartItems.length} items
                            </span>
                            {
                                user && user._id ? <Link to="/shipping">Proceed to Checkout</Link>
                                    : <Link to="/signin?redirect=shipping">Proceed to Checkout</Link>
                            }

                        </div>

                    </div>
                }
                <br />
                {
                    cartItems && cartItems.length > 0 ? cartItems.map((item, index) => <section key={index}>
                        <img src={`/images/${item.image}`} alt={item.name} />
                        <div className='item-det'>
                            <span className="name">{item.name}</span>
                            <div className='timestamp' title={item.createdAt}>
                                Added about <TimeAgo timestamp={item.createdAt} />
                            </div>
                            <span>
                                Quantity:
                                <div className="qty">
                                    <button onClick={() => dispatch(updateQtyOnSpecific({ qty: +1, max: item.stock, index: index }))}><i className="fa fa-plus"></i></button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => dispatch(updateQtyOnSpecific({ qty: -1, max: item.stock, index: index }))}><i className="fa fa-minus"></i></button>

                                </div>
                            </span>
                            <div className='last-div'>
                                <span>Price of {item.quantity} items is {item.quantity * item.price}$</span>
                                <span className='rem' onClick={() => dispatch(removeItemFromCart(item.id))}>Remove item from cart</span>
                            </div>

                        </div>

                    </section>) : <div className='empty-msg'>
                        <i className="fa fa-shopping-cart"></i>
                        <h3>Cart is empty</h3>
                        <Link to="/" ><h3>Go back to add foods in cart</h3></Link>
                    </div>
                }

            </div>
            <br />
        </div>
    )
}
