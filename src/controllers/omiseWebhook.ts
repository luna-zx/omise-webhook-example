import { Context } from "elysia"
import { ElysiaWS } from "elysia/dist/ws"

export default async (context: Context, wsSessions: Map<string, ElysiaWS>) => {
    const paymentData = context.body as any
    
    if (paymentData.key == "charge.complete") {
        const ws = wsSessions.get(paymentData.data.id)
        
        if (ws && ws.readyState) {
            ws.send({ message: `ชำระเงินจำนวน ${(paymentData.data.amount / 100).toFixed(2)} บาท` })
            ws.close()
        }
    }

    context.set.status = 200
    return
}