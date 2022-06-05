import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Formik, Field, Form } from 'formik';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";

import { Schema } from '../schemas/formSchema';
import { EventsList } from './events'
import {setShow, setArr, setTitle, setClearArr} from '../actions/todoAction';

const localizer = momentLocalizer(moment)

export const Todo = () => {
    const {show, title, arr} = useSelector(state => state.mainReducer.updateTodo)
    const [curretnDate, setCurretnDate] = useState(Date);
    const [selectedDate, setSelectedDate] = useState();
    const dispatch = useDispatch()

    const checkSlot = (e) => {
        let date = moment(e).format("MM/DD/YY")
        let previousDate = moment(curretnDate).format("MM/DD/YY")
        let diffe = moment(date).diff(previousDate) >= 0
        if (diffe) {
            setSelectedDate(date)
            dispatch(setShow(diffe))
            dispatch(setTitle("Add title"))
        } else {
            dispatch(setShow(diffe))
            alert("Please select coming Date!!!")
        }
    }

    const handleReset = () => {
        dispatch(setClearArr([]))
        dispatch(setShow(false))
    }

    return (
        <div className="d-flex justify-content-around">
            {/* {console.log(`from reducer===> ${JSON.stringify(states)}`)} */}
            <div className="">
                <Calendar
                    selectable={true}
                    views={"day"}
                    localizer={localizer}
                    onSelectSlot={(e) => checkSlot(e.start)}
                    events={arr}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ width: 900, height: 500 }}
                    eventPropGetter={(event, start, end, isSelected) => ({
                        event,
                        start,
                        end,
                        isSelected,
                        style: { backgroundColor: show ? "blue" : "white" }
                    })}
                />
                {show ? ""
                    :
                    <p>Please select date</p>}

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
                                dispatch(setArr({ "title": values.title, "desc": values.content, "start": selectedDate, "end": selectedDate }))
                            }}
                            onReset={() => { }}
                        >
                            {({ errors, touched }) => (
                                <Form >
                                    <div><p>Add envent on selected Date: {selectedDate}</p></div>
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
                                    <div className="d-flex">
                                        <div className="p-2">
                                            <button type="submit">Submit</button>
                                        </div>
                                        <div className="p-2">
                                            <button onClick={() => handleReset()} type="submit">clear</button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                }
                </div>
            </div>
            {arr.length <= 0 ? <div className="align-self-center">
                <h5>No Events Added</h5>
            </div>
                : <div className="vh-100 overflow-auto w-100 ">
                    {arr.map(events => (
                        <EventsList data={events} />
                    ))}
                </div>}
        </div >
    )
}
