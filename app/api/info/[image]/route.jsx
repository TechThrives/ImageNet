import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import Image from "@/lib/models/imageModels";

export const GET = async (req, { params }) => {
  try {
    const { client } = await connectToDb();

    const { image } = params;

    const info = await Image.findOne({ uid: image });

    if (!info) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
