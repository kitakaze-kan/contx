import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'react-daisyui'


const Home: NextPage = () => {
  
  return (
    <main className="text-white text-center h-screen overflow-hidden flex justify-center ">
            <div className="w-full text-center pt-20">
            <div className="relative text-center mx-auto max-w-3xl h-80">
                    <Image
                        src="/banner.png"
                        alt="contx"
                        objectFit="cover"
                        layout={"fill"}
                    />
              </div>
              <Link href="/pay" className="">
                <Button type="button" className="my-24 px-10 py-3 text-xl text-white bg-gradient-to-r from-border_l via-border_via to-border_r">Transfer</Button>
              </Link>
            </div>
        </main>
  )
}

export default Home
