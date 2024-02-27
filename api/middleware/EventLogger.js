import {v4 as uuid} from 'uuid'
import {format} from 'date-fns'
import path from 'path'
import { appendFile, mkdir } from 'fs/promises'
import fs from 'fs'

const eventLogger =  async (message, file) => {
    const dateItem = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const id = uuid();
    const logItem = `${dateItem}\t ${id}\t ${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname,'..', 'logs'))) {
            await mkdir(path.join(__dirname, '..', 'logs'))
        }
         await appendFile(path.join(__dirname, '..', 'logs', 'file'), logItem);
    } catch(err) {
        console.error(err);
    }


}
