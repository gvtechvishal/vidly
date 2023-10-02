import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const withRouter = WrapperComponent => props =>{

    const param = useParams();
    const navigate = useNavigate();

    return (
        <WrapperComponent params = {param} {...props} navigate ={navigate} />
    );
}

export default withRouter;