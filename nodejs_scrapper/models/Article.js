const articleSchema = new mongoose.Schema({
  title: String,
  sourceUrl: String,
  publishedAt: Date,
  sections: [
    {
      heading: String,
      blocks: [
        {
          type: {
            type: String, // paragraph | list
            required: true
          },
          text: String,
          ordered: Boolean,
          items: [
            {
              title: String,
              description: String
            }
          ]
        }
      ]
    }
  ],
  images: [String]
});
