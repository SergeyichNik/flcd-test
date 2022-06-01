import React from 'react';

import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, selectAuth, signUpTC} from "../store/auth-reducer";
import {useFormik} from "formik";
import * as Yup from 'yup';


const LoginPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    // @ts-ignore
    const fromPage = location.state?.from?.pathname || "/"

    const dispatch = useDispatch<any>()
    const {isLoggedIn} = useSelector(selectAuth)

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

    const onClickHandle = () => {
        dispatch(signUpTC("name", "woxas77376@nifect.com", "qwertyqwerty", "qwertyqwerty"))
    }

    if (isLoggedIn) return <Navigate to={fromPage} replace={true}/>

    return (
        <div>
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
                <button type={'submit'}>Login</button>
                <hr/>
                <div> No account yet? </div>
                <Link to={"/registration"}>Registration</Link>
            </form>
        </div>
    );
};

export default LoginPage;