import { validate } from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.users.count({
        where: {
            username: user.username,
        },
    });

    if (countUser === 1) {
        throw new responseError(400, "username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.users.create({
        data: user,
        select: {
            username: true,
            name: true,
        },
    });
};

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.users.findUnique({
        where: {
            username: loginRequest.username,
        },
        select: {
            username: true,
            password: true,
        },
    });

    if (!user) {
        throw new responseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(
        loginRequest.password,
        user.password
    );
    if (!isPasswordValid) {
        throw new responseError(401, "Username or password wrong");
    }

    const token = uuid().toString();
    return prismaClient.users.update({
        data: {
            token: token,
        },
        where: {
            username: user.username,
        },
        select: {
            token: true,
        },
    });
};

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.users.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
            name: true,
        },
    });

    if (!user) {
        throw new responseError(404, "user is not found");
    }

    return user;
};

export default {
    register,
    login,
    get,
};
