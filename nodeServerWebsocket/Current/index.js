let users = []

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

const getNameFromSocketId = (socketId) => {
    const user = users.find(u => u.id == socketId)
    if(user && user.name) return user.name
    return user
}

const removeFromUsers = (socketId) => {
    users = users.filter(u => u.id !== socketId)

}

const howManyUsers = () =>{
    return users.length
}





module.exports = {addUser, getRoomFromSocketId, removeFromUsers, howManyUsers, getNameFromSocketId}



