import { Hono } from 'hono'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '../lib/s3.js'

const uploadRouter = new Hono()

uploadRouter.post('/', async (c) => {
  try {
    const formData = await c.req.formData()

    const file = formData.get('image') as File

    if (!file) {
      return c.json(
        { message: 'No file uploaded' },
        400,
      )
    }

    const buffer = Buffer.from(
      await file.arrayBuffer(),
    )

    const fileName = `${Date.now()}-${file.name}`

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      }),
    )

    const imageUrl =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    return c.json({
      imageUrl,
    })
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Upload failed',
      },
      500,
    )
  }
})

export default uploadRouter