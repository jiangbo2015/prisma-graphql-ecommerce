import { PrismaClient } from '@prisma/client'
import { AuthenticationError } from 'apollo-server'
import * as Express from 'express'
import jwt from 'jsonwebtoken'
import { ExpressContext } from 'apollo-server-express'

const prisma = new PrismaClient()

interface User {
    id: number
    email: string
    role?: string // customer has no role prop
}
export interface Context {
    prisma: PrismaClient
    user?: User
}

export const context = ({ req }: ExpressContext): Context => {
    const token = req.headers.authorization
    if (token) {
        try {
            const user = <User>jwt.verify(token.replace('Bearer ', ''), 'supersecret')
            return {
                prisma,
                user,
            }
        } catch (e) {
            // throw new AuthenticationError('you must be logged in')
            // return { prisma }
        }
    }
    return {prisma}
    
}
