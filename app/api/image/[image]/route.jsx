import connectToDb from "@/lib/config";
import Image from "@/lib/models/imageModels";
import { NextResponse } from "next/server";
import Sharp from "sharp";
import { readFile } from "fs/promises";
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
        input: await readFile(process.cwd() + "/public/watermark.png"),
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

export const DELETE = async (req, { params }) => {
  const { client, bucket } = await connectToDb();

  try {
    const { image } = params;
    const deletedImage = await Image.deleteOne({ uid: image });

    if (deletedImage.deletedCount) {
      const files = await bucket
        .find({
          filename: image,
        })
        .toArray();

      const file = files[0];
      bucket.delete(file._id);

      return NextResponse.json({ msg: "Image File Deleted" }, { status: 200 });
    }
    return NextResponse.json({ error: "Image Not Found" }, { status: 404 });
  } catch (error) {
    console.error("Error in DETETE handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
