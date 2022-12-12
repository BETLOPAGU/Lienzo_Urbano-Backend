import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  public uploadPhoto = async (
    photo: string,
    photo_key: string,
  ): Promise<string> => {
    const ID = process.env.AWS_ID;
    const SECRET = process.env.AWS_SECRET;
    const BUCKET_NAME = 'piase';

    if (photo_key.startsWith('http')) {
      //if is an update
      let real_key = photo_key.split('/')[3];
      if (real_key && real_key.includes('?')) {
        real_key = real_key.split('?')[0];
      }
      if (real_key && real_key.includes('%')) {
        real_key = real_key.split('%')[0];
      }
      photo_key = real_key;
    }

    const buf = Buffer.from(
      photo.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

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
      // ContentType: 'image/jpeg',
    };

    try {
      const stored = await s3.upload(params).promise();
      return stored.Location + `?date=${Date.now()}`;
    } catch (err) {
      console.log('ERROR');
      console.log(err);
      return '';
    }
  };
}
