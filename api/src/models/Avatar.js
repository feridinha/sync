const { v4: uuidv4 } = require('uuid')

const imagesAvailable = [
    "avatar01.gif",
    "avatar02.gif",
    "avatar03.gif",
    "avatar04.gif",
    "avatar05.gif",
    "avatar06.gif",
    "avatar07.gif",
    "avatar08.gif",
    "avatar09.gif",
]

class Avatar{
    constructor(user){
        this.user = user
        this.image = null
        this.position = null
        this.uuid = uuidv4() 
    }

    createPosition(){
        this.position = Math.floor(Math.random() * 100)
        return this
    }

    forcePosition(position){
        this.position = position
        return this
    }

    createImage(){
        this.image = 
        imagesAvailable[
            Math.floor(Math.random() * imagesAvailable.length)
        ]
        return this
    }

    forceImage(image){
        this.image = image
    }
}

module.exports = Avatar