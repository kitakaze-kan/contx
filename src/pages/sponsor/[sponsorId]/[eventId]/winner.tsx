import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'react-daisyui'


const EventWinnerPage: NextPage = () => {

    const router = useRouter()
    const sponsorId = router.query.sponsorId as string
    const eventId = router.query.eventId as string 
    
    console.log({sponsorId})
    console.log({eventId})
  
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
              <h2 className='font-bold text-3xl'>Add Program Winner Page</h2>
            </div>
        </main>
  )
}

export default EventWinnerPage
