import Image from 'next/image'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <> 
    
      <Sidebar/>
      <Content/>
       </>
  )
}
