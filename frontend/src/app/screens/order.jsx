import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, getOrderItem, getOrderStatus } from "../../store/orderSlice"
import { useEffect } from "react"
const OrderScreen = () => {
	const { slug } = useParams()
	const orders = useSelector(getOrderItem)
	const orderStatus = useSelector(getOrderStatus)
	const dispatch = useDispatch()
	useEffect(() => {
		if (orderStatus === 'idle') {
			dispatch(getOrder(slug));
		}
		console.log(orderStatus, orders)
	}, [orderStatus, dispatch])

	return <div className='cart-view fading'>
		<div className='inner-view'>
			<h3>Order Screen</h3>
		</div>
	</div>
}
export default OrderScreen;
