import { getContactValidation } from "../validation/contact-validation.js";
import { createAddressValidation } from "../validation/address-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";

const create = async (user, contactId, request) => {
    contactId = await validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId,
        },
    });

    if (totalContactInDatabase !== 1) {
        throw new responseError(404, "contact is not found");
    }

    const address = await validate(createAddressValidation, request);
    address.contact_id = contactId;

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        },
    });
};

export default {
    create,
};
