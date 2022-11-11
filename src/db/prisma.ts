import { PrismaClient } from '@prisma/client';
import Log from '../lib/log';

const DBClient = {
  instance: new PrismaClient({
    log: [
        { level: 'query', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
    ],
  }),
};
DBClient.instance.$on('query', (e) => {
    // console.log('💎 query: ', e)
    // Log.createPrismaLog(e);
})
DBClient.instance.$on('error', (e) => {
    console.log('💎 ERROR: ', e)
    // Log.createPrismaLog(e);
})
DBClient.instance.$on('info', (e) => {
    // console.log('💎 INFO: ', e)
    // Log.createPrismaLog(e);
})
DBClient.instance.$on('warn', (e) => {
    // console.log('💎 WARN: ', e)
    // Log.createPrismaLog(e);
})
Object.freeze(DBClient);

export default DBClient;