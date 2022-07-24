import { useEffect, useState } from 'react';
import Stars from "../components/stars";
import Loading from "../components/loading-anim";
import { addItemToCart, resetStatus, cartItemStatus } from '../../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
const Product = ({ item, loading, handleCloseModel, setMessage }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch();
    const handleQty = (max, op) => {
        if (qty >= max && op === 1) return
        if (qty === 1 && op === -1) return
        setQty(qty + (op))
    }
    const cartStatus = useSelector(cartItemStatus)
    const addToCart = item => dispatch(addItemToCart({ id: item['_id'], name: item['name'], image: item['image'], price: item['price'], stock: item['stock'], quantity: qty, createdAt: new Date().toJSON() }))
    useEffect(() => {
        if (cartStatus === 'Added') {
            setMessage({ type: 'success', message: 'Item added successfully in cart!' })
            dispatch(resetStatus())
            handleCloseModel();
        }
    }, [cartStatus])

    return (
        <div className="product-view fading">
            {loading && <Loading styles={{ width: '800px' }} limit={1} />}
            {
                item != null && item['_id'] ? <>
                    <div className="fading item" style={{ background: '#eaf5ff' }}>
                        <div className="left">
                            <img src={"/images/" + item.image} alt="" />
                            {<Stars rating={item["rating"]} />}
                        </div>
                        <div className="right">
                            <div className="title">
                                <h3 className="title">{item.name}</h3>
                                <p onClick={handleCloseModel}><i className="fa fa-close"></i></p>
                            </div>
                            <span className="price">In just {item.price}$</span>
                            <span>Available in {item.restaurant}</span>
                            <p>{item.description}</p>
                            <span>
                                Restaurant ID: #{item.restID}
                            </span>
                            <span>Select Quantity <small>(Max {item.stock} in stock)</small></span>
                            <div className="qty">
                                <button onClick={() => handleQty(item.stock, 1)}><i className="fa fa-plus"></i></button>
                                <p>{qty}</p>
                                <button onClick={() => handleQty(item.stock, -1)}><i className="fa fa-minus"></i></button>

                            </div>

                            <button onClick={() => addToCart(item)} className="add-to-cart"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                        </div>
                        {/* {message && <Message type={message.type} message={message.message} />} */}
                    </div>
                </> : <div><h1 style={{ color: 'white' }}>Loading...</h1></div>
            }
        </div>)
}
export default Product