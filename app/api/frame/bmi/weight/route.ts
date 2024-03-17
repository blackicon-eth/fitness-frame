import { NextRequest, NextResponse } from "next/server";
import { getMainFrame, getMetricFrame } from "@/app/lib/getFrame";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // Getting the request payload
  const data = await req.json();

  // Getting the pressed button ID
  const buttonId = data.untrustedData.buttonIndex;

  // Getting the text input
  const inputText = data.untrustedData.inputText;
  const isValidTextInput = !isNaN(inputText) && parseFloat(inputText) > 0;

  // If the input is not valid
  if (!isValidTextInput) {
    return getMetricFrame(
      "Invalid input! Enter a valid weight (Kg)",
      "weight_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bmi/weight`
    );
  }

  // If the input is valid but out of range
  else if (isValidTextInput && (parseFloat(inputText) > 400 || parseFloat(inputText) < 20)) {
    return getMetricFrame(
      "Enter a body weight (Kg) between 20 and 400, please",
      "weight_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bmi/weight`
    );
  }

  // Next
  if (buttonId === 1) {
    return getMetricFrame(
      "What's your height? (Cm)",
      "height_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bmi/height?weight=${inputText}`
    );
  }

  // Start Over
  else {
    return getMainFrame();
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
