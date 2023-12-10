import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import Image from "@/lib/models/imageModels";

export const GET = async (req) => {
  try {
    const { client } = await connectToDb();
    const search = req.nextUrl.searchParams.get("s");
    const limit = req.nextUrl.searchParams.get("limit");
    const tags = req.nextUrl.searchParams.get("tags");
    const sortOrder = req.nextUrl.searchParams.get("sort");
    const conditions = {};
    const sortOptions = {};

    if (search && search !== "") {
      conditions.title = { $regex: new RegExp(search, "i") };
    }

    if (tags && tags !== "") {
      const findTags = tags.split(",");
      conditions.tags = { $in: findTags };
    }

    if (
      sortOrder &&
      (sortOrder.toLowerCase() === "asc" || sortOrder.toLowerCase() === "desc")
    ) {
      sortOptions.createdAt = sortOrder.toLowerCase() === "asc" ? 1 : -1;
    }

    const imagesInfo = await Image.find(conditions)
      .sort(sortOptions)
      .limit(limit);

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
