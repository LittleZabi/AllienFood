import { useState } from 'react';
import Stars from "../components/stars";
import Loading from "../components/loading-anim";
const Product = ({ item, loading, handleCloseModel }) => {
    const [qty, setQty] = useState(1)
    const handleQty = (max, op) => {
        if (qty >= max && op === 1) return
        if (qty === 1 && op === -1) return
        setQty(qty + (op))
    }
    return (
        <div className="product-view fading">
            {loading && <Loading styles={{ width: '800px' }} limit={1} />}
            {
                item != null && item['id'] ? <>
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
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio quo qui distinctio provident repellendus beatae fugiat eum minus vitae delectus nulla, officiis obcaecati corporis tenetur, soluta voluptatum? Vitae, et voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio quo qui distinctio provident repellendus beatae fugiat eum minus vitae delectus nulla, officiis obcaecati corporis tenetur, soluta voluptatum? Vitae, et voluptate.</p>
                            <span>
                                Restaurant ID: #{item.restID}
                            </span>
                            <span>Select Quantity <small>(Max {item.quantity} in stock)</small></span>
                            <div className="qty">
                                <button onClick={() => handleQty(item.quantity, 1)}><i className="fa fa-plus"></i></button>
                                <p>{qty}</p>
                                <button onClick={() => handleQty(item.quantity, -1)}><i className="fa fa-minus"></i></button>

                            </div>

                            <button className="add-to-cart"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                        </div>

                    </div>
                </> : <div><h1 style={{ color: 'white' }}>Loading...</h1></div>
            }
        </div>)
}
export default Product