const EventBus = {
    subscribers: {},

    subscribe: (eventType, callback) => {
        if (!EventBus.subscribers[eventType]) {
            EventBus.subscribers[eventType] = []
        }

        EventBus.subscribers[eventType].push(callback)
    },

    unsubscribe: (eventType, callback) => {
        if (!EventBus.subscribers[eventType]) {
            return
        }

        const index = EventBus.subscribers[eventType].indexOf(callback)
        if (index !== -1) {
            EventBus.subscribers[eventType].splice(index, 1)
        }
    },

    publish: (eventType, data) => {
        if (!EventBus.subscribers[eventType]) {
            return
        }

        EventBus.subscribers[eventType].forEach((callback) => {
            callback(data)
        })
    }
}

export default EventBus