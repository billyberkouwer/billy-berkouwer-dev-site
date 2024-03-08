import HomeLayout from "@/components/Home/HomeLayout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billy Myles-Berkouwer | 3D & Web Development",
  description: `Billy Myles-Berkouwer is a full-stack web developer, visual artist,
  and technical lead on 3D web projects for clients in arts and
  commercial sectors.`,
  keywords: "Web Development, 3D Artist, 3D Designer, Web Design, Fine Art",
};

export default function Home() {
  return <HomeLayout />;
}
