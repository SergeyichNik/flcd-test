import React from 'react';
import {useParams} from "react-router-dom";

const EditPostPage = () => {
    const {id} = useParams()
    return (
        <div>
            <h2>Edit post {id}</h2>
        </div>
    );
};

export default EditPostPage;