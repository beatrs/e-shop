
import React from "react"
import styled from "styled-components"
import "./Modal.scss"
import Popup from "reactjs-popup"

const Modal = (props) => {
    const btn = props.button
    const content = props.content
    const isAlert = false || props.isAlert
    const Button = React.forwardRef(({ open, ...props }, ref) => (
        <button className="button" ref={ref} {...props} style={btn.style}>{btn.name}</button>
    ))

    return (
        <Popup
            trigger={ open => <Button open={open} /> }

            modal
            nested
            closeOnDocumentClick
        >
            {close => (
                <div className="modal">
                    
                    <div className="modal--header">
                        <div className="header--title">{content.title}</div>
                        <button className="modal--button close" onClick={close}>
                            &times;
                        </button>
                    </div>
                    <div className="modal--body">
                        {content.body}
                    </div>
                    {!isAlert?
                    <div className="modal--footer">
                        <button className="btn-cancel" onClick={close}>Cancel</button>
                        <button className="btn-confirm" onClick={() => {
                            props.handleConfirm() 
                            close()
                        }}>Continue</button>
                    </div>
                    :
                    <div className="modal--footer">
                        <button className="btn-confirm" onClick={() => {
                            props.handleConfirm() 
                            close()
                        }}>Okay</button>
                    </div>
                    }
                </div>
            )}
        </Popup>
    )
}

export default Modal