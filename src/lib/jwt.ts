import { TOKEN_SEED, TOKEN_LIFE_TIME } from "../../config/constants";
import jwt from 'jsonwebtoken';

export interface TokenData {
    userId: number
    typeId: number
}

class JWT {
    static sign(user: {id: number, typeId: number} | null) {
        let token = '';
        let status = false;
        if (user) {
            token = 'Bearer ' + jwt.sign({ userId: user.id, typeId: user.typeId }, TOKEN_SEED, { expiresIn: TOKEN_LIFE_TIME });
            status = true;
        }
        const response = {
            status,
            token,
            user
        }
        return response;
    }

    static data(token: string): TokenData {
        try {
            const data: any = jwt.verify(token, TOKEN_SEED);
            return data;
        } catch (e) {
            return {
                userId: 0,
                typeId: 0
            };
        }
    }
}

export default JWT;