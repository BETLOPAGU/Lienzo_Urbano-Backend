export declare class Artwork {
    id: number;
    artistId: number;
    title: string;
    description?: string;
    imageUrl?: string;
    minWorkingHours?: number;
    maxWorkingHours?: number;
    minPrice?: number;
    maxPrice?: number;
    minHeight?: number;
    maxHeight?: number;
    minWidth?: number;
    maxWidth?: number;
    address?: string;
    longitude?: number;
    latitude?: number;
    createdDate?: Date;
    deletedDate?: Date;
    isDeleted?: boolean;
}
