import { useEffect } from 'react'
import { useState } from 'react'
import { CheckOutSteps } from '../components/checkout-steps'
import { useNavigate } from 'react-router-dom'
import { getShippingAddress, saveShippingAddress } from '../../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'

export const Shipping = ({ user }) => {
    const shippingAddress = useSelector(getShippingAddress)
    const [formValues, setFormValues] = useState(shippingAddress ? shippingAddress : { fullname: '', address: '', city: '', postal: '', country: '' })
    const [message, setMessage] = useState(false)
    const canSave = () => formValues.fullname && formValues.address && formValues.city && formValues.postal && formValues.country ? 1 : 0
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        if (!user._id) navigate('/signin?redirect=shipping')
    }, [])
    const handleForm = (e) => {
        e.preventDefault();
        if (canSave()) {
            dispatch(saveShippingAddress(formValues))
            navigate('/payment')
        } else {
            setMessage({ type: 'alert', message: 'Fill all boxes in the form carefully!' })
        }
    }
    const setValues = (value) => setFormValues({ ...formValues, ...value })
    return (
        <> {
            user._id &&
            <div className='page-size fading checkout-screen'>
                {message && <Message handleClose={() => setMessage(false)} variant={message.type} message={message.message} />}
                <CheckOutSteps checks={{ signIn: 1 }} />
                <form className="form shipping-form" onSubmit={handleForm}>
                    <span className="title">Shipping Address</span>
                    <span className="label">Enter your fullname</span>
                    <input type="text" value={formValues.fullname} onChange={(e) => setValues({ fullname: e.target.value })} placeholder="Enter address..." />
                    <span className="label">Enter your Address.</span>
                    <input type="text" value={formValues.address} onChange={(e) => setValues({ address: e.target.value })} placeholder="Enter address..." />
                    <span className="label">Enter City name.</span>
                    <input type="text" value={formValues.city} onChange={(e) => setValues({ city: e.target.value })} placeholder="Enter city..." />
                    <span className="label">Enter your Postal Code</span>
                    <input type="text" value={formValues.postal} onChange={(e) => setValues({ postal: e.target.value })} placeholder="Enter postal..." />
                    <span className="label">Enter your Country name.</span>
                    <input type="text" value={formValues.country} onChange={(e) => setValues({ country: e.target.value })} placeholder="Enter country..." />
                    <input type="submit" value="Continue" />
                </form>
                <br />
            </div>}
        </>
    )
}
