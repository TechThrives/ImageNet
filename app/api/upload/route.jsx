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

    const buffer = Buffer.from(base64Data, "base64");

    const stream = Readable.from(buffer);

    const newItem = new Image({
      title,
      description,
      uid,
      tags,
    });

    await newItem.save();

    const uploadStream = bucket.openUploadStream(uid, {});

    await stream.pipe(uploadStream);

    return NextResponse.json(
      { msg: "Image Upload Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
