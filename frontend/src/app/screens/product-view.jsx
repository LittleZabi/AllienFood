import { useParams, Link } from "react-router-dom"
import { useState } from 'react';
import items from "../../data";
import { useEffect } from "react";
import Stars from "../components/stars";
import colors from "../../colors";
import RenderItem from "../components/product-render";
import Loading from "../components/loading-anim";
import { getFood, foodsStatus, fetchFood, foodsError } from '../../store/foodsSlice'
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/message";
const Product = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [moreItems, setMoreItems] = useState(null)
    const genRandom = (max) => Math.ceil(Math.random() * (max))
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();
    const foodsState = useSelector(foodsStatus)
    const foodsError_ = useSelector(foodsError)
    const singleFood = useSelector(getFood)
    useEffect(() => {
        if (foodsState === 'idle') {
            dispatch(fetchFood(id))
        } else if (foodsState === 'pending') {
            setLoading(true)
        } else if (foodsState === 'error') {
            setLoading(false)
            setMessage({ type: 'error', message: foodsError_ })
        } else {
            setLoading(false)
            if (singleFood) setItem(singleFood)
            else setMessage({ type: 'alert', message: 'Item not found with this id: ' + id })
        }
    }, [dispatch, foodsState])
    useEffect(() => {
        let randomItem = []
        for (let i = 0; i < 10; i++) {
            let r = genRandom(items.length - 1)
            while (true) {
                let index = randomItem.indexOf(r);
                if (index > -1) r = genRandom(items.length - 1)
                else break
            }
            randomItem.push(items[r])
        }
        setMoreItems(randomItem)
    }, [id])

    let color = colors[Math.ceil(Math.random() * (colors.length - 1))];
    return (
        <div className="product-view fading">

            {message && <Message variant={message.type} message={message.message} />}
            {loading && <Loading styles={{ width: '800px' }} limit={1} />}
            {
                item != null ? <>
                    <div className="fading item" style={{ background: color }}>
                        <div className="left">
                            <img src={"/images/" + item.image} alt="" />
                            {<Stars rating={item["rating"]} />}
                        </div>
                        <div className="right">
                            <h3 className="title">{item.name}</h3>
                            <span className="price">In just {item.price}$</span>
                            <span>Available in {item.restaurant}</span>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio quo qui distinctio provident repellendus beatae fugiat eum minus vitae delectus nulla, officiis obcaecati corporis tenetur, soluta voluptatum? Vitae, et voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio quo qui distinctio provident repellendus beatae fugiat eum minus vitae delectus nulla, officiis obcaecati corporis tenetur, soluta voluptatum? Vitae, et voluptate.</p>
                            <span>
                                Restaurant ID: #{item.restID}
                            </span>
                            <button className="add-to-cart"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                        </div>

                    </div>
                </> : <div><h1 style={{ color: 'white' }}>Item not found</h1>

                </div>

            }
            <div className="more-item" style={{ marginTop: '100px' }}>
                {loading && <Loading limit={8} />}
                {!loading &&
                    moreItems && moreItems.map((item, index) => {
                        let color =
                            colors[Math.ceil(Math.random() * (colors.length - 1))];
                        return (
                            <RenderItem
                                index={index}
                                key={index}
                                item={item}
                                bgColor={color}
                            />
                        );
                    })}
            </div>
        </div>)
}
export default Product