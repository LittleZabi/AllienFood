import Stars from "./stars"

import { Link } from "react-router-dom";
const RenderItem = ({ item, bgColor, index }) => {
    return (
        <div className="card fading" style={{ animationDelay: index * 100 + 'ms' }}>
            <Link className="image-sec" to={`/product/${item["id"]}/${item["name"]}`}>
                <img
                    className="medium"
                    src={"/images/" + item["image"]}
                    alt={item["name"]}
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${item["id"]}/${item["name"]}`}>
                    <h2>{item["name"].replace("-", " ")}</h2>
                </Link>
                {<Stars rating={item["rating"]} />}
                <div className="price">
                    <span>
                        <i className="fa fa-dollar"></i>
                        {item["price"]}
                    </span>
                    <span className="restaurant"> {item["restaurant"]} </span>
                </div>
                <span className="restaurant">
                    Restaurant: #{item["restID"]}{" "}
                </span>
            </div>
            <div
                className="toolkit"
                style={{
                    background: bgColor,
                }}
            >
                <span>
                    <i className="fa fa-heart-circle-check heart"></i>
                    <i className="fa fa-message cmnt"></i>
                    <span className="badge">
                        {item["comments"] > 999 ? "999+" : item["comments"]}
                    </span>
                    <i className="fa fa-cart-plus cart"></i>
                </span>
            </div>
        </div>
    )
}
export default RenderItem