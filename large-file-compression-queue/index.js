const STATUSES = {
    PROCESSING: 'processing',
    READY: 'ready'
};

class LargeFileCompressionQueue {
    constructor() {
        this.queue = [];
    }

    add(key) {
        let existed = false;
        for (let i=0; i<this.queue.length; i++) {
            if (this.queue[i].key === key) {
                existed = true;
                break;
            }
        }

        if (!existed) {
            this._add(key)
        }
    }

    _add(key) {
        const newTask = {
            key,
            status: STATUSES.PROCESSING,
            requestedAt: new Date().toISOString(),
            size: 'unknown'
        };
        this.queue.push(newTask)
    }
}

module.exports = LargeFileCompressionQueue;
