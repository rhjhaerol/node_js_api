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

export const getTestUser = async () => {
    return prismaClient.users.findUnique({
        where: {
            username: "test",
        },
    });
};

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test",
        },
    });
};

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@test.com",
            phone: "08123456789",
        },
    });
};

export const createManyTestContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: "test",
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@test.com`,
                phone: `08123456789${i}`,
            },
        });
    }
};

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test",
        },
    });
};
