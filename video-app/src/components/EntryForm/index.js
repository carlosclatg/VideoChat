import React, { Fragment } from 'react';

export default function EntryForm({roomValue, nameValue, enterRoom, handleChangeName, handleChangeValue}){
    return(
        <Fragment>
            <form className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd"onSubmit={enterRoom}>
                <div className="control">
                    <input type="number" value={roomValue} placeholder="roomId" onChange={handleChangeValue} required />
                </div>
                <div className="control">
                    <input type="text" value = {nameValue} placeholder="Name" onChange={handleChangeName} required></input>
                </div>
                <div className="control">
                    <button className="button is-link" type="submit" id="room">Join Room</button>
                </div>
                <p className="infoText">If the room exists, you will join to the room, otherwise a new will be created</p>
            </form>
        </Fragment>
    )
}