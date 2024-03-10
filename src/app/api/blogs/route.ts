import { NextRequest, NextResponse } from "next/server";

import dbConnect from "~/app/libs/mongodb";
import Blog from "~/app/models/blog.schema";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, description, createdBy, userId, thumbnail, image } =
      await req.json();
    await dbConnect();
    const result = await Blog.create({
      title,
      description,
      createdBy,
      userId,
      thumbnail,
      image,
    });
    return NextResponse.json({
      status: "OK",
      message: "Blog Created",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  await dbConnect();
  const result = await Blog.find();
  return NextResponse.json({
    status: "ok",
    message: "get all the blogs successfully",
    result,
  });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  console.log(id);
  await dbConnect();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ status: "Ok", message: "Blog Deleted" });
}
