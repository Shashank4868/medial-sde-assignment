/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const imgUrl = searchParams.get('imgUrl')

    // Create a new Imageresponse(OG image) and return it.

    return new ImageResponse(
      (
        <div tw='w-[1200px] h-[630px] text-white flex flex-col'>
          <div tw='flex relative'>
            <img
              src={imgUrl}
              alt='uploaded-image'
              width={1200}
              height={630}
              style={{ position: 'relative' }}
            />
            <img
              src='https://medial.app/image/medial-purple-logo.png'
              alt='logo'
              style={{
                position: 'absolute',
                width: '2rem',
                height: '2rem',
                marginTop: '2rem',
                marginLeft: '2rem'
              }}
            />
          </div>
          <div
            tw='flex absolute mt-[430px] h-[200px] flex-col w-full p-8 rounded-xl'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              lineHeight: '2'
            }}
          >
            <div tw='text-3xl relative text-red-700 text-center flex'>
              {title}
            </div>
            <div tw='text-lg text-black relative font-semibold text-center flex'>
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (err: any) {
    console.log(err)
    return new Response('Failed to generate image', { status: 500 })
  }
}
