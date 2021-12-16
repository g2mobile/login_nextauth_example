import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"
const prisma = new PrismaClient()


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {
        case 'GET':
            return getAssuntos();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed.`)
    }

    async function getAssuntos() {

        const { id } = req.query

        try {

            const subassuntos = await prisma.assunto.findUnique({
                where: {
                    id: id,
                },
                select: {
                    subassunto: true,
                },
            })

            return res.status(200).json(subassuntos);
        } catch (error) {
            return res.status(400).json({ message: error });
        } finally {
            await prisma.$disconnect()
        }


    }



};

export default handler;