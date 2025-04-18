import jwt, { JwtPayload } from 'jsonwebtoken'
import tokenModel from '../models/token-model';
import { Types } from 'mongoose'

interface payloadObj {
    email: string
    id: Types.ObjectId
    isActivated: boolean
}

class TokenService {
    generateTokens(payload: payloadObj) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'jwt-secret-key', {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret-key', {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'jwt-secret-key') as JwtPayload;
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret-key') as JwtPayload;
            return userData;
        } catch (e) {
            return null
        }
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService()