import React from "react";
import moment from 'moment';

export const EventsList = (props) => {
    let time = moment(props.data.time).format("h:mm:ss a")
    return (
        <div className="p-2">
            <div className="card w-50 text-dark bg-light">
                <div className="card-body">
                    <h5 className="card-title">{props.data.title}</h5>
                    <p className="card-text">{props.data.desc}</p>
                    <p>{props.data.date}</p>
                    <p>{time}</p>
                </div>
            </div>
        </div>
    )
}
