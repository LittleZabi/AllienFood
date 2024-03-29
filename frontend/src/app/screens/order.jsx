import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { FlutterwaveButton } from 'react-flutterwave-button'
import { getOrder, getOrderItem, getOrderStatus, getOrderError, getPaidDetails, payOrder, clearOrder } from "../../store/orderSlice"
import { useEffect, useState, } from "react"
import { getUser } from "../../store/userSlice"
import Message from "../components/message"
import FlutterwaveIcon from "../components/flutterwave-icon"
import Loading from "../components/loading-anim"
import axios from "axios"
import TimeAgo from "../components/TimeAgo"
const OrderScreen = () => {
	const { slug } = useParams()
	const orders = useSelector(getOrderItem)
	const user = useSelector(getUser);
	const paid_details = useSelector(getPaidDetails)
	const orderStatus = useSelector(getOrderStatus)
	const getError = useSelector(getOrderError)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const [data, setData] = useState(false)
	const [config, setConfig] = useState(false)
	const dispatch = useDispatch()
	const onPaymentSuccess = res => {
		if (res.status === 'successful') {
			dispatch(payOrder({ order: data, token: user.user.token, payment_resposne: res }, res))
		} else {
			setMessage({ message: 'Payment not paid successfully! please try again', type: "error" })
		}
	}
	const getPayConfig = async () => {
		await axios.get('/app/config/flutterwave/').then(e => {
			setConfig(e.data)
		}).catch(e => {
			setMessage({ message: e.message, type: "error" })
		})
	}
	useEffect(() => {
		getPayConfig()
	}, [])
	useEffect(() => {
		if (orderStatus === 'order_idle') {
			setLoading(true);
			dispatch(getOrder({ slug, user: user.user }));
		} else if (orderStatus === 'order_complete') {
			setLoading(false);
			if (orders.error) {
				setMessage({ type: 'alert', message: orders.message })
			} else {
				setData(orders.order)
			}
		} else if (orderStatus === 'paid_pending') {
		} else if (orderStatus === 'paid_error') {
			setMessage({ type: 'alert', message: getError })
		} else if (orderStatus === 'paid_complete') {
			if (paid_details.error) {
				setMessage({ type: 'alert', message: paid_details.message })
			} else {
				window.location.reload();
			}
		}
		console.log(data)
	}, [orderStatus, dispatch, user, orders, slug, paid_details, getError])
	return <div className='order-details fading'>

		{message && <Message handleClose={() => setMessage(false)} variant={message.type} message={message.message} />}
		{loading && <Loading styles={{ boxShadow: 'none', width: '90%', margin: 'auto' }} />}
		<section className="user-details">


			<div className="user-info">
				<span className="title">{data && data.userfullname} abc</span>
				<span>Order ID: {data && data._id}</span>
				<span>Ordered on: {data && new Date(data.createdAt).toDateString()} <small style={{ marginLeft: 5 }}>(<TimeAgo timestamp={data.createdAt} />)</small></span>
				<span>Address: {data && data.shippingAddress.address}</span>
				{
					data && data.isDelviered ?
						<span className="delivered">Order Status: <p>Delivered <i className="fa fa-check"></i></p></span>
						:
						<span className="not-delivered">Order Status: <p>Not Delivered</p></span>
				}
			</div>
			<div className="order-summary">
				<span className="sub-title">Order Summary</span>
				<span>Items cost: ${data && data.itemsPrice}</span>
				<span>Shipping: ${data && data.shippingPrice}</span>
				<span>Tax: ${data && data.taxPrice}</span>
				<span className="sub-title">Total: ${data && data.totalPrice}</span>
			</div>
		</section>
		<section>
			<span className="sub-title">Payment Details</span>
			<div className="pay-method">
				<div className="payments-text">
					<span>
						Method
					</span>
					<div className="pay-btns normal">
						{
							data && data.paymentMethod && data.paymentMethod === 'Flutterwave' ?
								<FlutterwaveIcon />
								: data.paymentMethod === 'PayPal' ? <><i className="fab fa-paypal" ></i>{data.paymentMethod} </> :
									data.paymentMethod === 'Stripe' ? <><i className="fab fa-stripe"></i>{data.paymentMethod} </> : ''
						}
						<span className="b1"><small> {data && data.paymentMethod} (This Method Can't be changed now!)</small></span>
					</div>
				</div>
				<div>
					<span className="a1">Paid</span>
					<span className={data && data.isPaid ? 'paid-status success' : 'paid-status danger'}>
						{data && data.isPaid ? <TimeAgo timestamp={data.paidAt} /> : 'Not paid'}
					</span>
					<div className="pay-btns">
						{
							data && !data.isPaid && config && <>
								{data && data.paymentMethod === 'Flutterwave' ?
									<FlutterwaveButton
										buttonText={"Pay Now!"}
										flutterProps={
											{
												public_key: config.pub_key,
												tx_ref: config.trx_id,
												amount: data.totalPrice,
												currency: "USD",
												country: 'NG',
												payment_options: "card,mobilemoney,ussd",
												customer: {
													email: user.user.email,
													phone_number: "08102909300",
													name: data.shippingAddress.fullname,
												},
												callback: onPaymentSuccess,
												customizations: {
													title: "Allien Food store",
													description: "Buy instant food on your Home Now!",
													logo: "https://png.pngitem.com/pimgs/s/197-1979719_jjsh-and-beverage-svg-icon-food-and-beverage.png",
												},
											}
										}
									/>
									: <button>Pay Now!</button>}
							</>
						}
					</div>
				</div>
			</div>
		</section>

		<div className="cart-view fading">
			{
				data.orderItems && data.orderItems.map((e, k) => {
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
}
export default OrderScreen;
