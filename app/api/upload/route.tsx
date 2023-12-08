import User from "@/lib/models/userModels";
import connection from "@/lib/config";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const { username, password } = body
    if (!username || !password) {
        return NextResponse.json({ msg: "invalid fields" }, { status: 400 })
    }
    connection()
    try {
        const isUserPresent = await User.findOne({ username });
        if (!isUserPresent) {
            return NextResponse.json({ msg: "User is not available" }, { status: 200 })
        }
        const isPasswordMatch = await bcrypt.compare(password, isUserPresent.password)
        if (!isPasswordMatch) {
            return NextResponse.json({ msg: "Invalid Credentials" }, { status: 200 })
        }
        const privateKey = crypto.randomUUID();
        const name = isUserPresent.name;
        const token = jwt.sign({ username, name }, privateKey)
        const response = NextResponse.json({ msg: "User successfull login", success: true }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: err, success: false }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { headers } = req;
    console.log(headers)

    return NextResponse.json({ msg: cookies().get("token") }, { status: 400 })
}