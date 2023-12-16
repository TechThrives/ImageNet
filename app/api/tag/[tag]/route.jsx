import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import Image from "@/lib/models/imageModels";

export const GET = async (req, { params }) => {
  try {
    const { tag } = params;
    const { client } = await connectToDb();
    const search = req.nextUrl.searchParams.get("s");
    const limit = req.nextUrl.searchParams.get("limit");
    const conditions = {};

    if (search && search !== "") {
      conditions.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ];
    }

    conditions.tags = { $regex: new RegExp(tag, "i") };

    const imagesInfo = await Image.find(conditions).limit(limit);

    if (imagesInfo.length == 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 200 });
    }

    return NextResponse.json(imagesInfo);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
