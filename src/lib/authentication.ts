import JWT from "./jwt";

export default {
    BLOCKED_ACCESS_LEVEL: () => false,
    FREE_ACCESS_LEVEL: () => true,
    PERSONAL_ACCESS_LEVEL: (token: string, user_id: number) => {
        return JWT.data(token).user_id === Number(user_id)
    },
    SUPERIOR_RANGE_ACCESS_LEVEL: (token: string, type_id: number) => {
        return JWT.data(token).type_id >= Number(type_id)
    },
    EMPLOYEE_ACCESS_LEVEL: (token: string) => {
        return JWT.data(token).type_id >= 3;
    },
    HIGH_ACCESS_LEVEL: (token: string) => {
        const VALID_TYPES = [9, 10, 11, 12];
        return VALID_TYPES.includes(JWT.data(token).type_id);
    },
    ULTRA_HIGH_ACCESS_LEVEL: (token: string) => {
        const VALID_TYPES = [10, 11, 12];
        return VALID_TYPES.includes(JWT.data(token).type_id);
    },
    GOD_ACCESS_LEVEL: (token: string) => JWT.data(token).type_id === 12,
};