import { NextRequest, NextResponse } from "next/server";
import { getMainFrame, getMetricFrame, getBMIFrame } from "@/app/lib/getFrame";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // Getting the request payload
  const data = await req.json();
  const weight = req.nextUrl.searchParams.get("weight")!;

  // Getting the pressed button ID
  const buttonId = data.untrustedData.buttonIndex;

  // Getting the text input
  const inputText = data.untrustedData.inputText;
  const isValidTextInput = !isNaN(inputText) && parseFloat(inputText) > 0;

  // If the input is not valid
  if (!isValidTextInput) {
    return getMetricFrame(
      "Invalid input! Enter a valid height (Cm)",
      "height_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bmi/height`
    );
  }

  // If the input is valid but out of range
  else if (isValidTextInput && (parseFloat(inputText) > 300 || parseFloat(inputText) < 100)) {
    return getMetricFrame(
      "Enter a body height (Cm) between 100 and 300, please",
      "height_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bmi/height`
    );
  }

  // Next
  if (buttonId === 1) {
    const calculatedBMI = (parseFloat(weight) / Math.pow(parseFloat(inputText) / 100, 2)).toFixed(1);
    return getBMIFrame(calculatedBMI);
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
