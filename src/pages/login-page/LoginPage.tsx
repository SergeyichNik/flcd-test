import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {loginTC, selectApp, selectAuth} from "../../store";
import classes from "./LoginPage.module.css";


export const LoginPage = React.memo( () => {

    const dispatch = useDispatch<any>()
    const isLoggedIn = useSelector(selectAuth).isLoggedIn
    const status = useSelector(selectApp).status

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email('Invalid email format'),
            password: Yup.string().required('Required').min(7, 'Minimum 7 symbols'),
        }),
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password))
        }
    })

    if (isLoggedIn) return <Navigate to={"/posts"} replace={true}/>

    return (
        <div className={classes.wrapper}>
            <h2>LoginPage</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input {...formik.getFieldProps('email')} placeholder={"enter email"} type="text"/>
                    {formik.touched.email
                        && formik.errors.email
                        && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>
                <div>
                    <input {...formik.getFieldProps('password')} placeholder={"enter password"} type="password"/>
                    {formik.touched.password
                        && formik.errors.password
                        && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>
                <button disabled={status === "LOADING"} type={'submit'}>Login</button>
                <hr/>
                <div> No account yet? </div>
                <Link to={"/registration"}>Registration</Link>
            </form>
        </div>
    );
});
