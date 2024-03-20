import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.users.deleteMany({
        where: {
            username: "test",
        },
    });
};

export const createTestUser = async () => {
    await prismaClient.users.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test",
        },
    });
};