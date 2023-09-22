import cors from "cors"
import express from "express"

import { convert } from "./convert.jsx"
import { download } from "./download.jsx"
import { summarize } from "./summarize.jsx"
import { transcribe } from "./transcribe.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try{
    await download(request.params.id)
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)

    return response.json({ result })
  } catch(error){
    console.log(error)
    return response.json({error})
  }
  
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
  
})
app.listen(3333, () => console.log("Server is running on port 3333"))
