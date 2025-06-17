import { NextResponse } from "next/server";

let profile = {
  name: "Shahbaz Ahmad",
  email: "shahbaz@gmail.com",
  phone: "0987654321",
  location: "Pune",
  bio: "Just a regular developer."
};

export async function GET() {
  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const data = await req.json();
  profile = { ...profile, ...data };
  return NextResponse.json(profile);
}