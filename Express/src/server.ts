import app from "./app"
import config from "./config"
import { initDB } from "./db"


export const main = async () => {
    try {
        await initDB()
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`)
        })
    }
    catch (err) {
        console.error("Error starting the server:", err)
    }
}

main()