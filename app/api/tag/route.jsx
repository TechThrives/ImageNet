import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import Image from "@/lib/models/imageModels";

export const GET = async (req) => {
  try {
    const { client } = await connectToDb();
    const tags = await Image.distinct("tags");

    if (tags.length == 0) {
      return NextResponse.json({ error: "Tags not found" }, { status: 200 });
    }

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
