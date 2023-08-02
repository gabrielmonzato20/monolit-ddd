import request from "supertest";
import { app, sequelize } from "../../@shared/api/express";

describe("E2E test for product", () => {
    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    it("should create a product", async () => {
      const response = await request(app)
        .post("/product")
        .send({
          name: "Test",
          purchasePrice: 200.0,
          stock: 2,
          description: "Test"

        });
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test");
      expect(response.body.purchasePrice).toBe(200.0);

    });
  
    it("should not create a product", async () => {
      const response = await request(app).post("/product").send({
        name: "Test2",
      });
      expect(response.status).toBe(500);
    });
})