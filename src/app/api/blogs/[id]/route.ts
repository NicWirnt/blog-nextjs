import { NextRequest, NextResponse } from "next/server";
import dbConnect from "~/app/libs/mongodb";
import Blog from "~/app/models/blog.schema";

interface UpdateBlogRequest {
  newTitle: string;
  newDescription: string;
}

export async function PUT(req: NextRequest, { params }: any) {
  const { id } = params;
  const data = await req.json();

  const { newTitle: title, newDescription: description }: UpdateBlogRequest =
    data;
  await dbConnect();

  const res = await Blog.findByIdAndUpdate(id, { title, description });
  if (res) {
    return NextResponse.json({
      status: "OK",
      message: "blog updated",
    });
  }
}
export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;
  await dbConnect();
  const blog = await Blog.findOne({ _id: id });
  return NextResponse.json({
    status: "OK",
    message: "get blog by id successfully",
    blog,
  });
}
