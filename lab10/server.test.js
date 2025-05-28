const mongoose = require("mongoose");
const supertest = require("supertest");
const createServer = require("./server");
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/postsdb", {
    useNewUrlParser: true,
  });
});
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
const app = createServer();

//…
const Post = require("./models/Post");
// ...
test("GET /posts", async () => {
  const post = await Post.create({
    title: "Post 1",
    content: "Tekst postu 1",
  });
  await supertest(app)
    .get("/api/posts")
    .expect(200)
    .then((response) => {
      // Sprawdzenie typu i długości odpowiedzi
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      // Sprawdzenie danych odpowiedzi
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].title).toBe(post.title);
      expect(response.body[0].content).toBe(post.content);
    });
});

test("POST /api/posts", async () => {
  const data = {
    title: "Post 1",
    content: "Tekst postu 1",
  };
  await supertest(app)
    .post("/api/posts")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Sprawdzenie odpowiedzi
      expect(response.body._id).toBeTruthy();
      expect(response.body.title).toBe(data.title);
      expect(response.body.content).toBe(data.content);
      // Sprawdzenie danych w bazie
      const post = await Post.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.title).toBe(data.title);
      expect(post.content).toBe(data.content);
    });
});
