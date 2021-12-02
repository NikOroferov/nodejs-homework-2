// HSSsePTtxv62AQA - mongodb password
// mongodb+srv://Nik:HSSsePTtxv62AQA@cluster0.joyfk.mongodb.net/test - mongodb compass

const app = require("../app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
