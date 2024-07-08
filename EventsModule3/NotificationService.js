const EventEmitter = require('node:events')

class NotificationService extends EventEmitter{
    sendEmailNotification(message){
        this.emit('email', message);
    }

    sendSmsNotification(message){
        this.emit('sms', message);
    }

    sendPushNotification(message){
        this.emit('push', message);
    }
}

class LoggerService {
    constructor(notificationService){
        this.notificationService = notificationService;

        this.notificationService.on('email', (notification) => {
            console.log('Email: ' + notification)
        })

        this.notificationService.on('sms', (notification) => {
            console.log('Sms: ' + notification)
        })

        this.notificationService.on('push', (notification) => {
            console.log('Push: ' + notification)
        })
    }
}

const notificationService = new NotificationService();
new LoggerService(notificationService);

notificationService.sendEmailNotification('Email message');
notificationService.sendSmsNotification('Sms message');
notificationService.sendPushNotification('Push message');