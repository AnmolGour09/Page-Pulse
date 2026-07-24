import request from "supertest";
import app from "../src/app";

describe("Health API", () => {
  it("should return server health", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual({
      success: true,
      message: "Server is healthy",
    });
  });
});