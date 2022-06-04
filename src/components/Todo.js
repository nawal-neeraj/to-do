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
    const [arr, setArr] = useState([{ "title": "", "desc": "", "date": "" }]);
    const myEventsList = [
        {
            start: selectedDate,
            end: selectedDate,
            title: show ? title : ""
        }
    ];

    const checkSlot = (e) => {
        let date = moment(e).format("MM/DD/YY")
        let previousDate = moment(curretnDate).format("MM/DD/YY")
        let diffe = moment(date).diff(previousDate) >= 0
        if (diffe) {
            setSelectedDate(date)
            setShow(diffe)
        } else {
            setShow(diffe)
        }
    }

    return (
        <div className="d-flex justify-content-around">
            <div className="">
                <Calendar
                    selectable={true}
                    localizer={localizer}
                    onSelectSlot={(e) => checkSlot(e.start)}
                    events={myEventsList}
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
                                setArr(pre => [...pre, ...[{ "title": values.title, "desc": values.content, "date": selectedDate }]])
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form >
                                    <Field name="title" placeholder="Title" />
                                    {errors.title && touched.title ? (
                                        <div>{errors.title}</div>
                                    ) : null}
                                    <Field name="content" placeholder="content" />
                                    {errors.content && touched.content ? (
                                        <div>{errors.content}</div>
                                    ) : null}
                                    <button type="submit">Submit</button>
                                </Form>
                            )}
                        </Formik>
                }
                </div>
            </div>
            <div className="">
                {arr.map(data => (
                    <div>
                        <p>{data.title}</p>
                        <p>{data.desc}</p>
                        <p>{data.date}</p>
                    </div>
                ))}
            </div>
        </div >
    )
}