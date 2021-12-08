import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"

const prisma = new PrismaClient()


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({ req })

    if (!session) {
        return res.status(401).end(`Not Allowed.`)
    }

    switch (req.method) {
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed.`)
    }

    async function getUsers() {

        try {
            const allUsers = await prisma.post.findMany()
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(400).json({ message: error });
        } finally {
            await prisma.$disconnect()
        }


    }



};

export default handler;