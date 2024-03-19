import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", function () {
    afterEach(async () => {
        await prismaClient.users.deleteMany({
            where: {
                username: "rhjhaerol",
            },
        });
    });

    it("should can register new user", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "rhjhaerol",
            password: "rahasia",
            name: "M Rahaji Jhaerol",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("rhjhaerol");
        expect(result.body.data.password).toBeUndefined;
        expect(result.body.data.name).toBe("M Rahaji Jhaerol");
    });
});
