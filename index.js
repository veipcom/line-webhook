const express = require("express")
const app = express()

app.use(express.json())

// เก็บข้อมูลชั่วคราว (เดี๋ยวค่อยเปลี่ยนเป็น Firebase)
const users = {}

app.post("/webhook", (req, res) => {
  const event = req.body.events[0]

  // รับเฉพาะข้อความ
  if (event.type !== "message") {
    return res.sendStatus(200)
  }

  const userId = event.source.userId
  const text = event.message.text

  // ถ้ายังไม่รู้ว่าสาขาอะไร
  if (!users[userId]) {
    users[userId] = { branch: null }
  }

  // ยังไม่ได้เลือกสาขา
  if (!users[userId].branch) {
    users[userId].branch = text // สมมติว่าพิมพ์ชื่อสาขา
    reply(event.replyToken, `บันทึกสาขา "${text}" เรียบร้อยแล้วครับ`)
    return res.sendStatus(200)
  }

  // มีสาขาแล้ว = เป็นการแจ้งปัญหา
  console.log("📍 สาขา:", users[userId].branch)
  console.log("🛠 ปัญหา:", text)

  reply(
    event.replyToken,
    `รับเรื่องจากสาขา ${users[userId].branch} แล้วครับ\nกำลังดำเนินการ`
  )

  res.sendStatus(200)
})

// ฟังก์ชันตอบกลับ LINE (จะใช้จริงใน STEP ถัดไป)
function reply(token, text) {
  console.log("👉 ตอบกลับ:", text)
}

app.get("/", (req, res) => {
  res.send("LINE Webhook is running")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server started")
})
