const queryDB = require('../common/query-db');
const generateZipInS3 = require('../common/generate-zip-in-s3');
const getFileSizeString = require('../common/get-file-size-string');
const lodash = require('lodash');

const STATUS = {
    SCHEDULED: 'scheduled',
    PROCESSING: 'processing',
    READY: 'ready'
};

class LargeFileCompressionQueue {
    constructor(dbConnection, S3Detail) {
        this.dbConnection = dbConnection;
        this.S3Detail = S3Detail;
        this.waitingQueue = [];
        this.processedQueue = [];
        this.isProcessing = false;
    }

    add(whereConstraint) {
        let existed = false;
        // check if task with same where constraint exist in waitingQueue
        for (let i=0; i<this.waitingQueue.length; i++) {
            if (this.waitingQueue[i].key === whereConstraint) {
                existed = true;
                break;
            }
        }

        // check if task with same where constraint exist in processedQueue
        if (!existed) {
            for (let i=0; i<this.processedQueue.length; i++) {
                if (this.processedQueue[i].key === whereConstraint) {
                    existed = true;
                    break;
                }
            }
        }

        if (!existed) {
            this._add(whereConstraint)
        }
    }

    async _add(whereConstraint) {
        try {
            const queryString= `SELECT * FROM ${process.env.DB_TABLE} ${whereConstraint}`;
            const result = await queryDB(this.dbConnection, queryString);
            const idArray = result.map(row => row.id);

            const newTask = {
                key: whereConstraint,
                status: STATUS.SCHEDULED,
                requestedAt: new Date().toISOString(),
                size: 'unknown',
                filename: '',
                idArray
            };
            this.waitingQueue.push(newTask);
            this._processQueue();
        } catch (e) {
            console.log(e)
        }
    }

    async _processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const task = this.waitingQueue[0];
        task.status = STATUS.PROCESSING;

        const {filename, size} = await generateZipInS3(task.idArray, this.S3Detail);
        this.waitingQueue.shift();
        task.status = STATUS.READY;
        task.size = getFileSizeString(size);
        task.filename = filename;
        this.processedQueue.push(task);

        this.isProcessing = false;
        if (this.waitingQueue.length > 0) {
            this._processQueue()
        }
    }

    getQueueSnapshot() {
        const snapshot = [
            ...lodash.cloneDeep(this.processedQueue),
            ...lodash.cloneDeep(this.waitingQueue)
        ];

        snapshot.forEach(obj => {
            delete obj.idArray;
            if (obj.key === '') {
                obj.key = 'All items'
            }
        });

        return snapshot
    }
}

module.exports = LargeFileCompressionQueue;
