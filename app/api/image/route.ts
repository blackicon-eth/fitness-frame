import { NextRequest, NextResponse } from "next/server";
import { localImageToFrame } from "@/app/lib/generateImage";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // Getting params
  const event = req.nextUrl.searchParams.get("event")!;
  const value = req.nextUrl.searchParams.get("value")!;

  const frame = await localImageToFrame(event, value);
  return new NextResponse(frame);
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
