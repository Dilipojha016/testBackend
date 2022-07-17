
const Item = require("../controllers/item")
const auth = require("../middlewares/auth");
module.exports = function(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
        }
    });
    global.io = io;
    io.on('connection', async function(socket) {
        console.log("connected")
        socket.on("addItem",async (data)=>{
            if(auth.checkUserSocketSession(data)){
                const item = await Item.addItem(data);
                socket.emit("successAdd",item)
            }else{
                socket.emit("fail",{data:{statusCode: routes.SESSIONCODE,message:"Oops! Your session has expired.."}})
            }
           
        })
    });    
}
