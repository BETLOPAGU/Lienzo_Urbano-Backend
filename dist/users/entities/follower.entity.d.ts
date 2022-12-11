import { User } from './user.entity';
export declare class Follower {
    id: number;
    userId: number;
    followerId: number;
    createdDate: Date;
    follower?: User;
}
