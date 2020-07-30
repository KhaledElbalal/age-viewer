import React, {useRef}  from 'react';
import {useDispatch} from 'react-redux'
import AlertContainers from '../../alert/containers/AlertContainers'


const Editor = ({ onClick, addAlert, alertList, serverInfo }) => {
    const dispatch = useDispatch();
    let reqString = useRef()
    const clearReqString = () => (reqString.current.value = '' );
    
    const onEnter = (e) => {
        if(e.keyCode === 13){
            addFrame()
         }
    }
    
    const addFrame = () => {
        if (serverInfo.status === 'disconnected' && reqString.current.value.startsWith('match')) {
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
            return;
        } if (serverInfo.status === 'disconnected' && reqString.current.value === ':server status') {
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
            return;
        } else {
            dispatch(() => onClick(reqString))            
            return;
        }
    }; 
    const alerts = alertList.map((alert) => {
        return <AlertContainers key={alert.alerProps.key} alertKey={alert.alerProps.key} alertType={alert.alertType}/>;
    });
   
    return (
        <div className="container-fluid">
        <div className="card">
            <div className="container-fluid editor-area card-header">
                <div className="input-group">
                    <input type="text" className="form-control col-11" placeholder="$"
                        aria-label="AgensBrowser Editor" aria-describedby="editor-buttons" onKeyDown={onEnter} ref={reqString}/>
                    <div className="input-group-append ml-auto" id="editor-buttons">
                        <button className="frame-head-button btn btn-link" type="button"><span className="fa fa-star-o fa-lg"
                                aria-hidden="true"></span></button>
                        <button className="frame-head-button btn btn-link" type="button"><span className="fa fa-eraser fa-lg"
                                aria-hidden="true"></span></button>
                        <button className="frame-head-button btn btn-link" type="button" onClick={() => [addFrame(), clearReqString()]}><span className="fa fa-play-circle-o fa-lg"
                                aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
        {alerts}


        </div>
    );
}



export default Editor