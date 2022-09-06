import { useEffect, useState } from 'react'
import { CheckOutSteps } from '../components/checkout-steps'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import { getShippingAddress, cartItemsAll, getPaymentMethod, flushCart, resetStatus } from '../../store/cartSlice'
import { clearOrder, createOrder, getOrderItem, getOrderStatus } from '../../store/orderSlice'
import { getUser } from '../../store/userSlice'
import FlutterwaveBtn from "../components/flutterwave-icon"
export const PlaceorderScreen = () => {
    const items = useSelector(cartItemsAll)
    const paymentMethod = useSelector(getPaymentMethod)
    const shippingAddress = useSelector(getShippingAddress)
    const user = useSelector(getUser);
    const [prices, setPrices] = useState({})
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderStatus = useSelector(getOrderStatus)
    const orderItems = useSelector(getOrderItem)

    useEffect(() => {
        if (items.length === 0) setMessage({ type: 'alert', message: 'Cart is empty go and shop something!' })
        if (!paymentMethod || !shippingAddress || !shippingAddress.address) {
            navigate('/payment')
        }
        CalculatePrices()
        dispatch(resetStatus())
    }, [])
    const filterPrice = k => Number(k.toFixed(2))
    const CalculatePrices = () => {
        let total = 0;
        let tax = 0.15
        let shipping = 0
        items.map(e => {
            total = total + (filterPrice(e.price) * e.quantity)
        })
        shipping = total > 100 ? filterPrice(0) : filterPrice(10)
        const r = { items: filterPrice(total), totalPrice: filterPrice(total + tax + shipping), tax: filterPrice(tax * total), shipping }
        setPrices(r)
    }
    const placeOrderHandler = () => {
        !loading && dispatch(createOrder({ orderItems: items, user: user ? user.user : {}, shippingAddress, paymentMethod, itemsPrice: prices.items, shippingPrice: prices.shipping, taxPrice: prices.tax, totalPrice: prices.totalPrice }))
    }
    useEffect(() => {
        if (orderStatus === 'pending') setLoading(true)
        if (orderStatus !== 'pending') setLoading(false)
        if (orderStatus === 'complete') {
            if (orderItems.error) setMessage({ type: 'danger', message: orderItems.error })
            if (orderItems.message) setMessage({ type: 'alert', message: orderItems.message })
            if (orderItems.order) {
                dispatch(flushCart())
                dispatch(clearOrder())
                navigate(`/order/${orderItems.order._id}`)
            }
        }
    }, [orderStatus])
    return (
        <> {
            shippingAddress && shippingAddress.address &&
            <div className='page-size fading checkout-screen'>
                {message && <Message handleClose={() => setMessage(false)} variant={message.type} message={message.message} />}
                <CheckOutSteps checks={{ signIn: 1, shipping: 1, payment: 1 }} />
                <div className='wrapper'>
                    {
                        items.length > 0 ? (
                            <>

                                <div className="left">
                                    <div className='section fadings'>
                                        <span className='title'>Shipping Details</span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{shippingAddress.fullname}</td>
                                                </tr>
                                                <tr>
                                                    <th>Address</th>
                                                    <td>{shippingAddress.address}</td>
                                                </tr>
                                                <tr>
                                                    <th>Country</th>
                                                    <td>{shippingAddress.country}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='section fading'>
                                        <span className='title'>Selected Payment Method</span>
                                        <span className='payment'>
                                            {
                                                paymentMethod === 'Flutterwave' ?
                                                    <FlutterwaveBtn />
                                                    : paymentMethod === 'PayPal' ? <><i className="fab fa-paypal" ></i> {paymentMethod}</> :
                                                        paymentMethod === 'Stripe' ? <> <i className="fab fa-stripe"></i>  {paymentMethod}</> : ''
                                            }
                                        </span>

                                    </div>
                                    <div className="section fading">
                                        {
                                            items && items.map((e, k) => {
                                                return <section key={k} className="fading">
                                                    <img src={`/images/${e.image}`} alt="" />
                                                    <div>
                                                        <span className='title'>{e.name}</span>
                                                        <span className='sub-title'>Quantity {e.quantity}</span>
                                                        <span className='sub-title'>Price ${e.price}</span>
                                                        <span className='sub-title'>Total {e.quantity} x ${e.price}  = ${e.quantity * e.price}</span>
                                                    </div>
                                                </section>
                                            })
                                        }

                                    </div>
                                </div>
                                <div className="right">
                                    <div className='section'>
                                        <span className='title'>Order Summary</span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Items</th>
                                                    <td>${prices.items && prices.items.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>${prices.shipping && prices.shipping.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Tax</th>
                                                    <td>${prices.tax && prices.tax.toFixed(2)}</td>
                                                </tr>
                                                <tr className='bold'>
                                                    <th>Total</th>
                                                    <td>${prices.totalPrice && prices.totalPrice.toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button className='placeorder-btn' disabled={loading} onClick={placeOrderHandler}>Place order</button>
                                    </div>
                                </div>
                            </>
                        ) : <div className='cart-view fading'>
                            <br /><br />
                            <div className='empty-msg'>
                                <i className="fa fa-shopping-cart"></i>
                                <h3>Cart is empty</h3>
                                <Link to="/" ><h3>Go back to add foods in cart</h3></Link>
                            </div>
                            <br /><br />
                        </div>
                    }

                </div>
            </div>}
        </>
    )
}
