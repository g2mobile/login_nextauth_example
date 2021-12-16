import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"
const prisma = new PrismaClient()


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {
        case 'GET':
            return getSubAssuntos();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed.`)
    }

    async function getSubAssuntos() {

        try {
            const allSubAssuntos = await prisma.subAssunto.findMany()
            
            return res.status(200).json(allSubAssuntos);
        } catch (error) {
            return res.status(400).json({ message: error });
        } finally {
            await prisma.$disconnect()
        }


    }



};

export default handler;