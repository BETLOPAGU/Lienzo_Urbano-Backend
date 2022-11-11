import fs from 'fs';
import path from 'path';

class Log {
    static createLog(filename: string, error: string, extra_information: string): boolean {
        let dir = path.join(__dirname, '../../logs/');
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            dir += filename + '.log.json';

            let errorJSON = {
                id: Date.now(),
                error,
                extra_information,
                event_datetime: new Date(),
            };
            let json: any = [];
            
            if (fs.existsSync(dir)) {
                const data = fs.readFileSync(dir, 'utf8');
                try {
                    json = JSON.parse(data);
                } catch {
                    json = []
                }
            }
            json.unshift(errorJSON);
            fs.writeFileSync(dir, JSON.stringify(json));
            return true;
        } catch(Exception) {
            console.log('No se guardó el error', dir, Exception);
            return false;
        }
    }
    static createPrismaLog(log: any): boolean {
        let dir = path.join(__dirname, '../../logs/');
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            dir += 'prisma.log.json';

            let json: any = [];
            
            if (fs.existsSync(dir)) {
                const data = fs.readFileSync(dir, 'utf8');
                try {
                    json = JSON.parse(data);
                } catch {
                    json = []
                }
            }
            json.unshift(log);
            fs.writeFileSync(dir, JSON.stringify(json));
            return true;
        } catch(Exception) {
            console.log('No se guardó el error', dir, Exception);
            return false;
        }
    }

    static getLog(filename: string) {
        let dir = path.join(__dirname, '../../logs/') + filename + '.log.json';
        try {
            const json = JSON.parse(fs.readFileSync(dir, 'utf8'));
            return json;
        } catch(Exception) {
            console.log('No se pudo obtener el log', dir, Exception);
            return [];
        }
    }

    static deleteErrorInLog(filename: string, id: string): boolean {
        let dir = path.join(__dirname, '../../logs/') + filename + '.log.json';
        try {
            let json = JSON.parse(fs.readFileSync(dir, 'utf8'));
            json = json.filter((d: any) => d.id != id);
            fs.writeFileSync(dir, JSON.stringify(json));
            return true;
        } catch(Exception) {
            console.log('No se eliminó el error en el log', dir, Exception);
            return false;
        }
    }

    static deleteLogFile(filename: string): boolean {
        let dir = path.join(__dirname, '../../logs/') + filename + '.log.json';
        try {
            fs.unlinkSync(dir);
            return true;
        } catch(Exception) {
            console.log('No se eliminó el log', dir, Exception);
            return false;
        }
    }

}

export default Log;