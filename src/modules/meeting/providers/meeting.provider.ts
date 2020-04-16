import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets'
import { IMessageBody } from '../models/message.interface'

@WebSocketGateway(4343, { transports: ['websocket'] })
export class MeetingSocketController {
    private standbyClients: { [id: string]: string[] } = {}

    @WebSocketServer() 
    private server: SocketIO.Server

    @SubscribeMessage('signal')
    public signal(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: IMessageBody) {
        socket.join(message.roomId)
        // Logger.Warn(`Accessing SocketID: ${socketId} from signal event handler`)
        // Logger.Info(`${message.sender} has sent socketID of ${message.roomId}`)

        // During the signaling process, we will pass messages to the intended recipient using their socket id.
        // This will ensure that the correct ICE candidate informaiton reaches its intended destination, 
        // and will help prevent errors while attempting to add ice candidates on the client.

        socket.broadcast.to(message.roomId).emit('signal', message)
    }

    @SubscribeMessage('standby')
    public standby(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: IMessageBody, socketId: SocketIO.Room) {
        const room = message.roomId != null ? message.roomId : message.meetingId
        socket.join(room)

        const roomCount = socket.adapter.rooms[message.meetingId].length

        // once a client connects with a socket id in the message, 
        // emit the 'ready' event to the appropriate client
        if (roomCount > 1 && message.roomId) {

            // two or more memebrs are ready send the host (or client)'s socket id to the guest (or host)
            socket.to(message.roomId).emit('ready', message)
            this.standbyClients[message.meetingId] = []
        } else {

            // the meeting host (or client) just connected, send its socket id to the guest (or host)
            // this event triggers the _addMember method on the client
            socket.to(message.meetingId).emit('standby', { ...message, roomId: socketId })
        }
    }

    @SubscribeMessage('exchange')
    public exchange(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: IMessageBody) {
        socket.join(message.roomId)

        socket.broadcast.to(message.roomId).emit('exchange', message)
    }

    @SubscribeMessage('timer')
    public timer(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: IMessageBody) {
        socket.join(message.meetingId)
        // const client = this.standbyClients[message.meetingId].find((clientId: string) => clientId === message.clientId)

        if (this.standbyClients[message.meetingId].length >= 2) {
            this.server.in(message.meetingId).emit('timer', { ...message, mode: "starttimer" })
            // delete this.standbyClients[message.meetingId]
        }
        else {
            this.standbyClients[message.meetingId].push(message.clientId)
            console.log(this.standbyClients[message.meetingId])
        }
    }

}