import { NextResponse } from "next/server";
import { comments } from "../db/db";

export const GET = async () => {
  try {
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse?.json({ error: "An error occurred" }, { status: 500 });
  }
};
