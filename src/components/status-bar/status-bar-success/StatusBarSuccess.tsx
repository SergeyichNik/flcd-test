import React, {useEffect} from 'react';
import classes from "./StatusBarSuccess.module.css";
import {useDispatch} from "react-redux";
import {setSuccessMessageAC} from "../../../store/actions";

export const StatusBarSuccess = ({message}: {message?: string}) => {

    const dispatch = useDispatch<any>()

    useEffect(() => {
        setTimeout(() => {dispatch(setSuccessMessageAC(null))},3000)
    },[])
    return (
        <div className={classes.main}>
            {message}
        </div>
    );
};
