const Message = (props) => {
    const closeModal = e => {
        if (props.handleClose) {
            props.handleClose()
        } else {
            e.target.parentNode.style.display = 'none'
        }
    }
    return (<div className={`message-box ${props.variant || "success"}`} >
        <span>{props.message}</span>
        <span className="close" onClick={(e) => closeModal(e)}>&times;</span>
    </div >)
}

export default Message