class User {
    constructor(id, name, room){
        this.id = id
        this.name = name
        this.room = room
    }
    get SocketId(){return this.id}
    get Name(){return this.name}
    get Room(){return this.room}
};

module.exports = User

