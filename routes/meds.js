const express = require('express')
const { deleteModel } = require('mongoose')
const MedModel = require('../models/med')

const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const meds = await MedModel.find()
        res.json({ meds: meds })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



router.post("/addnew", async (req, res) => {
    const med = new MedModel({
        drug_company: req.body.drug_company,
        drug_brand_name: req.body.drug_brand_name,
        drug_generic_name: req.body.drug_generic_name
    })

    try {
        const newMed = await med.save()
        res.status(201).json({ newMed: newMed })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



async function getMed(req, res, next) {
    let med
    try {
        med = await MedModel.findById(req.params.id)
        if(med == null) {
            return res.status(400).json({ message: "Cannot find that Medicine record" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.med = med
    next()
}



router.get("/:id", getMed, (req, res) => {
    res.json(res.med)
})



router.patch("/:id", getMed, async (req, res) => {
    console.log(res.med)
    if(req.body.drug_company != null){
        res.med.drug_company = req.body.drug_company}
    if(req.body.drug_brand_name != null){
        res.med.drug_brand_name = req.body.drug_brand_name;}
    if(req.body.drug_generic_name != null){
        res.med.drug_generic_name = req.body.drug_generic_name;}

    try {
        const updatedMed = await res.med.save()
        res.json({ message: `Drug record has been updated ${updatedMed}` })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



router.put("/:id", getMed, async (req, res) => {
    try {
        const updatedMed = await res.med.set(req.body)
        res.json(updatedMed)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



router.delete("/:id", getMed, async (req, res) => {
    try {
        const deletedMed = await res.med.deleteOne()
        res.json({ message: `Drug record has been deleted ${deletedMed}` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router
