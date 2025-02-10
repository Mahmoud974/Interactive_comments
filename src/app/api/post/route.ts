import { NextResponse } from "next/server";
import { comments } from "../db/db";

export const POST = async (req: Request) => {
  try {
    const newComment = await req.json();

    if (
      !newComment.pseudo ||
      !newComment.comment ||
      !newComment.date ||
      !newComment.parentId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const parentComment = comments.find(
      (comment) => comment.id === newComment.parentId
    );

    if (!parentComment) {
      return NextResponse.json(
        { error: "Parent comment not found" },
        { status: 404 }
      );
    }

    parentComment.reply.push(newComment);

    return NextResponse.json(
      { message: "Reply added successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
