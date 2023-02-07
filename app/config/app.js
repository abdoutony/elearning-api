require("dotenv").config()
const {MONGO_DEV_URL} = process.env
const {MONGO_TEST_URL} = process.env
const {MONGO_PROD_URL} = process.env
module.exports = {

        database:{
            dev:MONGO_DEV_URL,
            test:MONGO_TEST_URL,
            prod:MONGO_PROD_URL
        }
    }

