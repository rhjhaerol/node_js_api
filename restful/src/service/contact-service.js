import { validate } from "../validation/validation.js";
import {
    createContactValidation,
    getContactValidation,
    searchContactValidation,
    updateContactValidation,
} from "../validation/contact-validation.js";
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";

const create = async (user, request) => {
    const contact = validate(createContactValidation, request);
    contact.username = user.username;

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        },
    });
};

const get = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        },
    });

    if (!contact) {
        throw new responseError(404, "contact is not found");
    }

    return contact;
};

const update = async (user, request) => {
    const contact = await validate(updateContactValidation, request);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contact.id,
        },
    });

    if (totalContactInDatabase !== 1) {
        throw new responseError(404, "contact is not found");
    }

    return prismaClient.contact.update({
        where: {
            id: contact.id,
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        },
    });
};

const remove = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId,
        },
    });

    if (totalContactInDatabase !== 1) {
        throw new responseError(404, "contact is not found");
    }

    return prismaClient.contact.delete({
        where: {
            id: contactId,
        },
    });
};

const search = async (user, request) => {
    request = await validate(searchContactValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 2) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filter = [];
    filter.push({
        username: user.username,
    });

    if (request.name) {
        filter.push({
            OR: [
                {
                    first_name: {
                        contains: request.name,
                    },
                    last_name: {
                        contains: request.name,
                    },
                },
            ],
        });
    }
    if (request.email) {
        filter.push({
            email: {
                contains: request.email,
            },
        });
    }
    if (request.phone) {
        filter.push({
            phone: {
                contains: request.phone,
            },
        });
    }

    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filter,
        },
        take: request.size,
        skip: skip,
    });

    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filter,
        },
    });

    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size),
        },
    };
};

export default {
    create,
    get,
    update,
    remove,
    search,
};
