import Stars from "./stars"
const RenderItem = ({ item, bgColor, index, handleViewItem }) => {
    return (
        <div className="card fading" style={{
            borderColor: bgColor,
        }}>
            <span className="image-sec" >
                <img onClick={() => handleViewItem(item['_id'])}
                    className="medium"
                    src={"/media/images/" + item["image"]}
                    alt={item["name"]}
                />
            </span>
            <div className="card-body">
                <span className="item-name" onClick={() => handleViewItem(item['_id'])}>
                    <h2>{item["name"].replace("-", " ")}</h2>
                </span>
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

        </div >
    )
}
export default RenderItem