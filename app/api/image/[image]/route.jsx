import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { bucket } = await connectToDb();

    const { image } = params;

    const files = await bucket.find({ filename: image }).toArray();

    if (files.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = files[0];

    const stream = bucket.openDownloadStreamByName(file.filename);

    return new NextResponse(stream, {
      headers: { "Content-Type": file.contentType },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
