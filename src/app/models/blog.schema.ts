import { Document, Schema, model, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  createdBy: string;
  userId: string;
  thumbnail: string;
  image: string;
  createdAt: Date;
}

export type TBlog = IBlog & {
  title: string;
  description: string;
  createdBy: string;
  userId: string;
  thumbnail: string;
  image: string;
  createdAt: Date;
};

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  userId: { type: String, required: true },
  thumbnail: { type: String },
  image: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;
