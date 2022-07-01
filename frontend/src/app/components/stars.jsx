const Stars = ({ rating }) => {
    console.log(rating)
    return (
        <div className="stars--div">
            {
                rating > 0 && rating < 0.6 ? <span>
                    <i className="fa fa-star-half"></i>
                </span> : <span>
                    <i className="fa fa-star"></i>
                </span>
            }
            {
                rating > 1 && rating < 1.6 ? <span>
                    <i className="fa fa-star-half"></i>
                </span> : <span>
                    <i className="fa fa-star"></i>
                </span>
            }
            {
                rating > 2 && rating < 2.6 ? <span>
                    <i className="fa fa-star-half"></i>
                </span> : <span>
                    <i className="fa fa-star"></i>
                </span>
            }
            {
                rating > 3 && rating < 3.6 ? <span>
                    <i className="fa fa-star-half"></i>
                </span> : <span>
                    <i className="fa fa-star"></i>
                </span>
            }
            {
                rating > 4 && rating < 4.6 ? <span>
                    <i className="fa fa-star-half"></i>
                </span> : <span>
                    <i className="fa fa-star"></i>
                </span>
            }
            {/* {
                rating > 5 && rating < 5.6 ? <span>
                    <i className="fa fa-star-half"></i>
                </span> : <span>
                    <i className="fa fa-star"></i>
                </span>
            } */}
        </div>
    )
}
export default Stars