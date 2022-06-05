import React from "react";

export const EventsList = (props) => {
    return (
        <div className="p-2 align-self-cente">
            <div className="card w-50">
                <div className="card-body">
                    <h5 className="card-title">{props.data.title}</h5>
                    <p className="card-text">{props.data.desc}</p>
                    <p>{props.data.date}</p>
                </div>
            </div>
        </div>
    )
}