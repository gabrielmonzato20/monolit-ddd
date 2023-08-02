import request from "supertest";
import { app, sequelize } from "../../@shared/api/express";

describe("E2E test for product", () => {
    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    it("should create a client", async () => {
      const response = await request(app)
        .post("/clients")
        .send({
          name: "Test",
          email: "test@test.com",
          address: "StreetA avenue2"

        });
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test");
      expect(response.body.email).toBe("test@test.com");
      expect(response.body.address).toBe("StreetA avenue2");

    });
  
    it("should not create a client", async () => {
      const response = await request(app).post("/clients").send({
        name: "Test2",
      });
      expect(response.status).toBe(500);
    });
})