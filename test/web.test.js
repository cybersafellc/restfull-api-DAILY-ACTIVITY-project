import web from "../src/app/web.js";
import supertest from "supertest";
describe("web testing", () => {
  it("call notfound endpoint", async () => {
    const response = await supertest(web).get("/notfound");
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
