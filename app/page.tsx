import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Kcals",
      action: "post",
    },
    {
      label: "BMI",
      action: "post",
    },
    {
      label: "Body Fat %",
      action: "post",
    },
    {
      label: "Fun Facts",
      action: "post",
    },
  ],
  image: { src: `${process.env.NEXT_PUBLIC_BASE_URL}/frames/front_image.jpg` },
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/main`,
});

export const metadata: Metadata = {
  title: "Fitness Frame",
  description: "A farcaster frame that lets you calculate some fitness metrics and check on fun facts.",
  openGraph: {
    title: "Fitness Frame",
    description: "A farcaster frame that lets you calculate some fitness metrics and check on fun facts.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/frames/front_image.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  return (
    <>
      <h1>Fitness Frame</h1>
    </>
  );
}
