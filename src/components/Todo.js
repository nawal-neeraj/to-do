import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

const Schema = yup.object().shape({
    title: yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    content: yup.string()
        .min(10, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Required'),
});

export const Todo = () => {
    const [curretnDate, setCurretnDate] = useState(Date);
    const [selectedDate, setSelectedDate] = useState();
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Add title");
    const [arr, setArr] = useState([]);

    const checkSlot = (e) => {
        let date = moment(e).format("MM/DD/YY")
        let previousDate = moment(curretnDate).format("MM/DD/YY")
        let diffe = moment(date).diff(previousDate) >= 0
        if (diffe) {
            setSelectedDate(date)
            setShow(diffe)
            setTitle("Add title")
        } else {
            setShow(diffe)
        }
    }

    return (
        <div className="d-flex justify-content-around">
            <div className="">
                <Calendar
                    selectable={true}
                    views={"day"}
                    localizer={localizer}
                    onSelectSlot={(e) => checkSlot(e.start)}
                    events={arr}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ width: 600, height: 500 }}
                    eventPropGetter={(event, start, end, isSelected) => ({
                        event,
                        start,
                        end,
                        isSelected,
                        style: { backgroundColor: show ? "blue" : "white" }
                    })}
                />
                {show ? "" : <p>Please plan for next date</p>}
                <div style={{ padding: 10 }}>{
                    !show ? null :
                        <Formik
                            initialValues={{
                                title: '',
                                content: '',
                            }}
                            validationSchema={Schema}
                            onSubmit={values => {
                                setTitle(values.title)
                                setArr([...arr, ...[{ "title": values.title, "desc": values.content, "start": selectedDate, "end": selectedDate }]])
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form >
                                    <div><p>Date selected: {selectedDate}</p></div>
                                    <div style={{ padding: 2 }}>
                                        <Field name="title" placeholder="Title" maxLength={20} />
                                        {errors.title && touched.title ? (
                                            <div>{errors.title}</div>
                                        ) : null}
                                    </div>
                                    <div style={{ padding: 2 }}>
                                        <Field name="content" placeholder="content" />
                                        {errors.content && touched.content ? (
                                            <div>{errors.content}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit">Submit</button>
                                </Form>
                            )}
                        </Formik>
                }
                </div>
            </div>
            {arr.length <= 0 ? <div className="align-self-center">
                <h5>No Events Added</h5>
            </div>
                : <div className="vh-100 overflow-auto w-100">
                    {arr.map(data => (
                        <div className="p-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text">{data.desc}</p>
                                    <p>{data.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}

        </div >
    )
}