import React from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {selectApp, selectAuth, signUpTC} from "../../store";


export const RegistrationPage = () => {

    const dispatch = useDispatch<any>()
    const isLoggedIn = useSelector(selectAuth).isLoggedIn
    const status = useSelector(selectApp).status

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required('Required').min(5),
            email: Yup.string().trim().required('Required').email('Invalid email format'),
            password: Yup.string().trim().required('Required').min(7, 'Minimum 7 symbols'),
            password_confirmation: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: (values) => {
            dispatch(signUpTC(values))
            formik.resetForm()
        }
    })

    if (status === "SUCCESS") return <Navigate to={"/login"} replace={true}/>
    if (isLoggedIn) return <Navigate to={"/"} replace={true}/>

    return (
        <div>
            <h2>Registration Page</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input {...formik.getFieldProps('name')} placeholder={"Enter your name"} type="text"/>
                    {formik.touched.name
                        && formik.errors.name
                        && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>
                <div>
                    <input {...formik.getFieldProps('email')} placeholder={"Enter email"} type="text"/>
                    {formik.touched.email
                        && formik.errors.email
                        && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>
                <div>
                    <input {...formik.getFieldProps('password')} placeholder={"Enter password"} type="password"/>
                    {formik.touched.password
                        && formik.errors.password
                        && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>
                <div>
                    <input {...formik.getFieldProps('password_confirmation')} placeholder={"Confirm password"} type="password"/>
                    {formik.touched.password_confirmation
                        && formik.errors.password_confirmation
                        && <div style={{color: 'red'}}>{formik.errors.password_confirmation}</div>}
                </div>
                <button type={'submit'} >Registration</button>
            </form>
        </div>
    );
};
