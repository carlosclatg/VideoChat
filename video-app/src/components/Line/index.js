import React, { Fragment } from 'react';

export default function Line({text}){
    return (
        <Fragment>
            <article className="message is-dark">
                <div className="message-body">
                    {text}
                </div>
            </article>
        </Fragment>
    )
}