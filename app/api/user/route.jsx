import User from "@/lib/models/userModels";
import connectToDb from "@/lib/config";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import fs from "fs";

export const POST = async (req) => {
  try {
    const { client } = await connectToDb();

    const data = await req.json();

    const email = data.email;

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { error: "This email already redeem ImageNet coupon code" },
        { status: 403 }
      );
    }

    const code = uuidv4().split("-").join("").toUpperCase().slice(0, 10);
    const limit = 3;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = fs.readFileSync(
      "./app/api/user/emailTemplate.html",
      "utf8"
    );

    const customizedHtml = htmlTemplate
      .replace("_YourCouponCode_", code)
      .replace("_Limit_", limit);

    const mailOptions = {
      from: "ImageNet <no-reply@imagenet.in>",
      to: email,
      subject: "Exclusive Coupon Offer!",
      html: customizedHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    const newItem = new User({
      email,
      code,
      limit,
    });

    await newItem.save();

    return NextResponse.json(
      { msg: "Check email for coupon code" },
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
