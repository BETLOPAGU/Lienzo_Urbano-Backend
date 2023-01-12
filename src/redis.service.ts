import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  public async storeArtworkGeolocation(data: {
    longitude: number;
    latitude: number;
    artworkId: number;
  }) {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    await client.geoAdd('artwork-locations', {
      longitude: data.longitude,
      latitude: data.latitude,
      member: data.artworkId + '',
    });

    await client.disconnect();
  }

  public async getArtworksOnRadius(data: {
    longitude: number;
    latitude: number;
    radius: number;
  }): Promise<number[]> {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const artworksRadius = await client.geoRadius(
      'artwork-locations',
      {
        longitude: data.longitude,
        latitude: data.latitude,
      },
      data.radius,
      'm',
    );

    await client.disconnect();

    return artworksRadius.map((a) => Number(a));
  }

  public async deleteArtworkGeolocations() {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    await client.del('artwork-locations');

    await client.disconnect();
  }
}
