export declare class RedisService {
    storeArtworkGeolocation(data: {
        longitude: number;
        latitude: number;
        artworkId: number;
    }): Promise<void>;
    getArtworksOnRadius(data: {
        longitude: number;
        latitude: number;
        radius: number;
    }): Promise<number[]>;
    deleteArtworkGeolocations(): Promise<void>;
}
