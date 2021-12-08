import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
    switch (req.method) {
        case 'GET':
            return getUsers();
        //case 'POST':
          //  return createUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getUsers() {

        try {
            const allUsers = await prisma.users.findMany()
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(400).json({ message: error });
        } finally{
            await prisma.$disconnect()
        }

        
    }
    


};

export default handler;