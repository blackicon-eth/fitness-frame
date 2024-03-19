import { NextRequest, NextResponse } from "next/server";
import { getMainFrame, getMetricFrame } from "@/app/lib/getFrame";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // Getting the request payload
  const data = await req.json();
  const gender = req.nextUrl.searchParams.get("gender")!;
  const weight = req.nextUrl.searchParams.get("weight")!;
  const activity = req.nextUrl.searchParams.get("activity")!;

  // Getting the pressed button ID
  const buttonId = data.untrustedData.buttonIndex;

  // Start Over
  if (buttonId === 1) {
    return getMainFrame();
  }

  // Getting the text input
  const inputText = data.untrustedData.inputText;
  const isValidTextInput = !isNaN(inputText) && parseFloat(inputText) > 0;

  // If the input is not valid
  if (!isValidTextInput) {
    return getMetricFrame(
      "Invalid input!",
      "height_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/cc/height?bf_know=no&gender=${gender}&weight=${weight}&activity=${activity}`
    );
  }

  // If the input is valid but out of range
  else if (isValidTextInput && (parseFloat(inputText) > 300 || parseFloat(inputText) < 100)) {
    return getMetricFrame(
      "Enter height between 100 and 300",
      "height_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/cc/height?bf_know=no&gender=${gender}&weight=${weight}&activity=${activity}`
    );
  }

  // Next
  return getMetricFrame(
    "What's your age?",
    "age_image",
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/cc/age?bf_know=no&gender=${gender}&weight=${weight}&activity=${activity}&height=${inputText}`
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
