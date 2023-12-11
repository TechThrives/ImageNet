import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    return NextResponse.json({ error: "Nothing Here" }, { status: 400 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
