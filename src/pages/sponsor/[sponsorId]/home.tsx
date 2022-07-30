import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'react-daisyui'


const SponsorHome: NextPage = () => {
  
  return (
    <main className="text-white text-center h-screen overflow-hidden flex justify-center ">
            <div className="w-full text-center pt-20">
            <div className="relative text-center mx-auto max-w-3xl h-32 sm:h-80">
                    <Image
                        src="/banner.png"
                        alt="contx"
                        objectFit="cover"
                        layout={"fill"}
                    />
              </div>
              <h2 className='font-bold text-3xl'>Sponsor Home</h2>
            </div>
        </main>
  )
}

export default SponsorHome
