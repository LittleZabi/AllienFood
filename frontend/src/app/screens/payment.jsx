import { useEffect } from 'react'
import { useState } from 'react'
import { CheckOutSteps } from '../components/checkout-steps'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import { setPaymentMethod as setPayMethod, getShippingAddress } from '../../store/cartSlice'
export const PaymentsScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const [message, setMessage] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const shippingAddress = useSelector(getShippingAddress)
    useEffect(() => {
        if (!shippingAddress || !shippingAddress.address) {
            navigate('/shipping')
        }
    }, [])
    const handleForm = (e) => {
        e.preventDefault();
        dispatch(setPayMethod(paymentMethod))
        navigate('/placeorder')

    }
    return (
        <> {
            shippingAddress && shippingAddress.address &&
            <div className='page-size fading checkout-screen'>
                {message && <Message handleClose={() => setMessage(false)} variant={message.type} message={message.message} />}
                <CheckOutSteps checks={{ signIn: 1, shipping: 1 }} />
                <form className="form shipping-form" onSubmit={handleForm}>
                    <span className="title">Select Payment Method</span>
                    <div className="payment">

                        <div className="flex">
                            <input type="radio" defaultChecked={true} required onClick={(e) => { setPaymentMethod(e.target.value) }} name="payment" id="paypal" value="PayPal" />
                            <label htmlFor='paypal' className="label flex">
                                <i className="fab fa-paypal" ></i>
                                PayPal Payments
                            </label>
                        </div>
                        <div className="flex">

                            <input type="radio" required onClick={(e) => { setPaymentMethod(e.target.value) }} name="payment" id="stripe" value="Stripe" />
                            <label htmlFor='stripe' className="label flex">
                                <i className="fab fa-stripe"></i>
                                Stripe Payments
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Continue" />
                </form>
                <br />
            </div>}
        </>
    )
}
