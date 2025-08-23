import Post from "../models/Post";

async function testPost() {
  try {
    const newPost = new Post({
      title: "Test Post",
      content: "This is a test post."
    })
  } catch (err) {
    console.error(err);
  }
}


testPost();