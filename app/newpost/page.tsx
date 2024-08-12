import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Metadata } from 'next'
import Image from 'next/image'

import logo from '@/app/assets/medial-purple-logo.png'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

// generate dynamic metadata for the post

export const generateMetadata = ({ searchParams }: Props): Metadata => {
  return {
    title: `${searchParams.title}`,
    description: `${searchParams.description}`,
    openGraph: {
      title: `${searchParams.title}`,
      description: `${searchParams.description}`,
      images: [
        {
          url: `/api/og?title=${searchParams.title}&description=${searchParams.description}&imgUrl=${searchParams.imgUrl}`,
          width: 1200,
          height: 630,
          alt: `${searchParams.title}`
        }
      ]
    }
  }
}

export default function Page({ searchParams }: Props) {
  // Show a post in a good UI
  return (
    <div className='m-8'>
      <Image
        src={logo}
        alt='medial-logo'
        width={24}
        style={{ height: '24px', margin: '2rem' }}
      />
      <p className='text-3xl font-semibold text-center m-8'>New Post</p>
      <Card className='m-auto w-full max-w-[400px] min-h-[500px] h-full rounded-3xl bg'>
        <CardHeader>
          <CardTitle className='text-left font-medium text-2xl  p-4'>
            Default user
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='w-[300] h-[300]'>
            <Image
              src={`${searchParams.imgUrl}`}
              alt={`${searchParams.title}`}
              width={400}
              height={300}
              style={{
                margin: 'auto',
                borderRadius: '10px'
              }}
            />
          </div>
          <div className='p-2 flex flex-row w-[150px] justify-between'>
            <div className='flex'>
              <Image
                width='24'
                height='24'
                src='https://img.icons8.com/material-outlined/24/FFFFFF/facebook-like--v1.png'
                alt='facebook-like--v1'
              />
              {229}
            </div>
            <div className='flex'>
              <Image
                width='24'
                height='24'
                src='https://img.icons8.com/ios/50/FFFFFF/speech-bubble--v1.png'
                alt='speech-bubble--v1'
              />
              {178}
            </div>
          </div>
        </CardContent>
        <CardFooter className='border-t flex flex-col rounded-xl text-left items-start'>
          <div className='text-left font-medium text-xl text-red-700 p-4 '>
            {searchParams.title}
          </div>
          <p className='text-left w-full p-4 break-words text-md border-t'>
            {searchParams.description}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
