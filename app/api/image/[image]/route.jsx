import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import Sharp from "sharp";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import streamToBuffer from "stream-to-buffer";

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

    const buffer = await new Promise((resolve, reject) => {
      streamToBuffer(stream, (err, buf) => {
        if (err) reject(err);
        else resolve(buf);
      });
    });

    const watermarked = Sharp(buffer).composite([
      {
        input: await readFile(resolve("./app/api/image/[image]/watermark.png")),
        gravity: "southeast",
      },
    ]);

    const headers = {
      "Content-Type": "image/png",
    };

    return new NextResponse(watermarked, {
      headers,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
