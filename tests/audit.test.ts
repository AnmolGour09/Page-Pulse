import request from "supertest";
import app from "../src/app";
import { cache } from "../src/cache/cache";

describe("Health Endpoint", () => {

  it("should return server health", async () => {

    const response = await request(app)
      .get("/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

  });

});

describe("Audit Validation", () => {

  it("should reject invalid url", async () => {

    const response = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "abc",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("INVALID_URL");

  });

});

describe("Audit API", () => {

  it("should audit github", async () => {

    const response = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "https://github.com",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.url).toBe("https://github.com");

  });

});

describe("Cache", () => {

  beforeEach(() => {
    cache.flushAll();
  });

  it("should use cache", async () => {

    const first = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "https://github.com",
      });

    expect(first.body.data.cached).toBe(false);

    const second = await request(app)
      .post("/api/v1/audit")
      .send({
        url: "https://github.com",
      });

    expect(second.body.data.cached).toBe(true);

  });

});

describe("Rate Limiter", () => {

  // Enable this test later by replacing `it.skip` with `it`
  it.skip("should rate limit requests", async () => {

    await request(app)
      .post("/api/v1/audit")
      .send({ url: "https://github.com" });

    await request(app)
      .post("/api/v1/audit")
      .send({ url: "https://github.com" });

    const response = await request(app)
      .post("/api/v1/audit")
      .send({ url: "https://github.com" });

    expect(response.status).toBe(429);

  });

});
describe("404 Handler", () => {
  it("should return 404 for unknown route", async () => {
    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});