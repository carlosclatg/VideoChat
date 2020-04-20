import React, { Fragment } from 'react';
import './index.sass';

export default function Line({message}){
    return (
        <Fragment>
            <article className="message is-dark">
                <div className="message__body">
                    { message.user == 'you' ?
                        <p className="message__body-you">{message.user}</p>
                        :
                        <p className="message__body-other">{message.user}</p>
                    }
                    <p> said: </p> 
                    <p>{message.text}</p>
                </div>
            </article>
        </Fragment>
    )
}