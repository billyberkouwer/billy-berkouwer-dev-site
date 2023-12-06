import HomeLayout from "@/components/Homepage/HomeLayout";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Billy Myles-Berkouwer | 3D & Web Development',
  description: 'Billy is a full-stack web developer and 3D designer.',
  keywords: 'Web Development, 3D Artist, 3D Designer, Web Design, Fine Art',
}

export default function Home() {

  return <HomeLayout />
}
