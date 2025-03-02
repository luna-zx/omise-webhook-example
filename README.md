# ตัวอย่างการรับ charge events จาก Omise Webhook

> Dependencies :
- Elysia.js
- Omise.js

### วิธีการทดสอบ

```bash
git clone https://github.com/luna-zx/omise-webhook-example.git
cd omise-webhook-example
bun install
```

แก้ `OMISE_PUBLIC_KEY` และ `OMISE_SECRET_KEY` ในไฟล์ `.env` ด้วยน้า  

```env
OMISE_PUBLIC_KEY = 
OMISE_SECRET_KEY = 
```

HTTP Server จะรันอยู่บน http://localhost:3000 แต่ Omise ยังไม่สามารถส่ง webhook มาได้เพราะว่ารันอยู่ในเครื่อง ในตัวอย่างนี้จะใช้ ngrok ทำ Port forwarding

```bash
npm run dev
```

```bash
ngrok http http://localhost:3000
```

เอา ngrok url ไปใส่ใน Omise (Omise Dashboard -> Settings -> Webhooks -> เพิ่ม https://xxxxxx.ngrok-free.app/webhook)

