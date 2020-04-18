const users = []

const addUser = user => {
    if(user.name && user.room){ //check values
        if(users.find(u => u.name == user.name && u.room == user.room)) throw new Error('Already logged in user')
        users.push(user)
    } else {
        throw new Error('name and room not empty')
    }
}


const getRoomFromSocketId = (socketId) => {
    const user = users.find(u => u.id == socketId)
    if(user && user.room) return user.room
    return user
}





module.exports = {addUser, getRoomFromSocketId}



