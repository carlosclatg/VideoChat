import React, { Fragment } from 'react';
import Line from '../Line'

export default function Conversation({messages}){
    return(
        <Fragment>
            {messages && messages.length ?
                messages.map(text => {
                    return <Line message={text}></Line>
                })
                :
                <p></p>
            }
        </Fragment>
    )
}


