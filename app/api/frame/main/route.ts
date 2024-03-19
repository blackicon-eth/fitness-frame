import { NextRequest, NextResponse } from "next/server";
import { getInvalidFIDFrame, getFunFactFrame, getMetricFrame, getGenderFrame } from "@/app/lib/getFrame";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // Getting the user fid and validating it
  const data = await req.json();
  const fid = data.untrustedData.fid;
  if (!fid && isNaN(fid) && parseInt(fid) < 0) {
    return getInvalidFIDFrame();
  }

  // Getting the pressed button ID
  const buttonId = data.untrustedData.buttonIndex;

  // KCALS Calculator
  if (buttonId === 1) {
    return getFunFactFrame("1");
  }

  // BMI Calculator
  else if (buttonId === 2) {
    return getMetricFrame(
      "What's your body weight? (Kg)",
      "weight_image",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bmi/weight`
    );
  }

  // Body Fat % Calculator
  else if (buttonId === 3) {
    return getGenderFrame("gender_image", `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/bf/gender`);
  }

  // Fun Fact
  else {
    const randomId = (Math.floor(Math.random() * 22) + 1).toString();
    return getFunFactFrame(randomId);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
