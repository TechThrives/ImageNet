import User from "@/lib/models/userModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  try {
    const { client } = await connectToDb();

    const formData = await req.formData();

    const email = formData.get("email");

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { error: "Email Already Redeem ImageNet Code" },
        { status: 403 }
      );
    }

    const code = uuidv4().split("-").join("").toUpperCase().slice(0, 10);
    const limit = 3;

    const newItem = new User({
      email,
      code,
      limit,
    });

    await newItem.save();

    return NextResponse.json({ msg: "Check Email for Code" }, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
