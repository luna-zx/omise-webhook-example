import { Context } from "elysia"
import Omise from "omise"

const omise = Omise({
    publicKey: Bun.env.OMISE_PUBLIC_KEY,
    secretKey: Bun.env.OMISE_SECRET_KEY
})

export default async (context: Context) => {
    const { amount } = context.body as { amount: number }

    const source = await omise.sources.create({
        type: "promptpay",
        amount: amount, // หน่วยเป็นสตางค์นะครับ เช่น amount = 10000 (100 บาท)
        currency: "THB"
    })

    const charge = await omise.charges.create({
        amount: amount, // หน่วยเป็นสตางค์นะครับ เช่น amount = 10000 (100 บาท)
        currency: "THB",
        source: source.id
    })
    
    context.set.status = 200
    return { 
        chargeId: charge.id, 
        qrCode: charge.source?.scannable_code.image.download_uri 
    }
}