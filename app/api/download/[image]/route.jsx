import User from "@/lib/models/userModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    const { client, bucket } = await connectToDb();

    const data = await req.json();

    const code = data.code;

    const { image } = params;

    const info = await User.findOne({ code: code });

    if (!info) {
      return NextResponse.json({ error: "Invalid Code" }, { status: 404 });
    } else {
      const files = await bucket.find({ filename: image }).toArray();

      if (files.length === 0) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }

      const file = files[0];

      const stream = bucket.openDownloadStreamByName(file.filename);

      const headers = {
        "Content-Type": "image/png",
      };

      return new NextResponse(stream, {
        headers,
      });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
