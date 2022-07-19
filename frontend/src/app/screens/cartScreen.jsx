import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { cartItemsAll, updateQtyOnSpecific, removeItemFromCart } from '../../store/cartSlice'
export const CartScreen = () => {
    const items = useSelector(cartItemsAll)
    const [cartItems, setCartItems] = useState(null)
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setCartItems(items)
        let p = 0;
        items.map(e => {
            p += e.price * e.quantity
        })
        setTotalPrice(p)
    }, [items])

    return (
        <div className='cart-view fading'>
            <div className='inner-view'>
                {
                    cartItems && cartItems.length > 0 && <div className='cart-title'> <span><b>${totalPrice}</b> Total price of <b>{items.length} items</b> in cart with quantities</span></div>
                }
                <br />
                {
                    cartItems && cartItems.length > 0 ? cartItems.map((item, index) => <section key={index}>
                        <img src={`/images/${item.image}`} alt={item.name} />
                        <div className='item-det'>
                            <span className="name">{item.name}</span>
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
        </div>
    )
}
