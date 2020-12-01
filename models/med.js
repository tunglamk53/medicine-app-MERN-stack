const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedSchema = new Schema({
    drug_company: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },  
    drug_brand_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    drug_generic_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

const collection = "meds_col"
const MedModel = mongoose.model("MedDB", MedSchema, collection)

module.exports = MedModel