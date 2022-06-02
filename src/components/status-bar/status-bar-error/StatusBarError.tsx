import React, {useEffect} from 'react';
import classes from "./StatusBarError.module.css";
import {useDispatch} from "react-redux";
import {setErrorMessageAC} from "../../../store";

export const StatusBarError = ({error}: {error?: string}) => {

    const dispatch = useDispatch<any>()

    useEffect(() => {
        setTimeout(() => {dispatch(setErrorMessageAC(null))},3000)
    },[])
    return (
        <div className={classes.main}>
            {error}
        </div>
    );
};
