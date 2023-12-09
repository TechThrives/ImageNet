import Image from "@/lib/models/imageModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  try {
    const { bucket } = await connectToDb();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("desc");
    const tags = formData.get("tags").split(",");
    const uid = uuidv4();

    const imageField = formData.get("image");
    const base64Data = imageField.replace(/^data:image\/\w+;base64,/, "");

    // Creating a Buffer from the base64 data
    const buffer = Buffer.from(base64Data, "base64");

    // Creating a readable stream from the buffer
    const stream = Readable.from(buffer);

    // Uploading the image to MongoDB GridFS
    const uploadStream = bucket.openUploadStream(uid, {});

    // Piping the stream to the upload stream
    await stream.pipe(uploadStream);

    // Creating a new Image document with title and image URL
    const newItem = new Image({
      title,
      description,
      uid,
      tags,
    });

    // Saving the new item to the database
    await newItem.save();

    return NextResponse.json({ msg: "ok" });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
