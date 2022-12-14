"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = class S3Service {
    constructor() {
        this.uploadPhoto = async (photo, photo_key) => {
            const ID = process.env.AWS_ID;
            const SECRET = process.env.AWS_SECRET;
            const BUCKET_NAME = 'piase';
            if (photo_key.startsWith('http')) {
                let real_key = photo_key.split('/')[3];
                if (real_key && real_key.includes('?')) {
                    real_key = real_key.split('?')[0];
                }
                if (real_key && real_key.includes('%')) {
                    real_key = real_key.split('%')[0];
                }
                photo_key = real_key;
            }
            const buf = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const s3 = new AWS.S3({
                accessKeyId: ID,
                secretAccessKey: SECRET,
            });
            const params = {
                ACL: 'public-read',
                Bucket: BUCKET_NAME,
                Key: photo_key,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/png',
            };
            try {
                const stored = await s3.upload(params).promise();
                return stored.Location + `?date=${Date.now()}`;
            }
            catch (err) {
                console.log('ERROR');
                console.log(err);
                return '';
            }
        };
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map