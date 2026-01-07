const express = require("express")
const app = express()

app.use(express.json())

app.post("/webhook", (req, res) => {
  console.log("LINE ส่งข้อมูลมาแล้ว")
  res.sendStatus(200)
})

app.get("/", (req, res) => {
  res.send("LINE Webhook is running")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server started")
})
