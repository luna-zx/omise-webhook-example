import { Elysia, t } from "elysia"
import { ElysiaWS } from "elysia/dist/ws"

import genQR from "./controllers/genQR"
import omiseWebhook from "./controllers/omiseWebhook"

const app = new Elysia()

const wsSessions = new Map<string, ElysiaWS>()

app.ws("/payment", {
    open(ws) {
        const chargeId = ws.data.request.headers.get("x-charge-id")
        if (!chargeId) {
            ws.send({ message: "Charge ID is required!" })
            ws.close()
            return
        }

        wsSessions.set(chargeId, ws)
    },

    close(ws) {
      const chargeId = ws.data.request.headers.get("x-charge-id")
      if (chargeId) {
          wsSessions.delete(chargeId)
      }

      ws.close()
    }
})

app.post("/gen-qr", genQR, { body: t.Object({ amount: t.Number() }) })
app.post("/webhook", context => omiseWebhook(context, wsSessions))

app.listen(Bun.env.PORT)
console.log(`ELYSIA APP RUNNING ON ${app.server?.hostname}:${app.server?.port}`)