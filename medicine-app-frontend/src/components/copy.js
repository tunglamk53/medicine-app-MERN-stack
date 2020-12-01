// './components/IndexPage'
import React, { useState, useEffect } from 'react'
import axios from "axios";

const IndexPage = () => {
    const [meds, setMeds] = useState(null)
    const [inputTyped, setInputTyped] = useState("")
    const [filteredData, setFilteredData] = useState(null)

    // fetch all Meds from db
    async function fetchMeds() {
        try {
            const result = await axios({
                method: "GET",
                url: "http://localhost:4000/",
                headers: {
                "Content-Type": "application/json"
                }
            })
            setMeds(result.data.meds)
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect to update meds
    useEffect(() => {
        fetchMeds()
    }, [setMeds])
    
    console.log(meds)

    // print rows for meds
    function printMedsRows () {
        if(filteredData && filteredData.length > 0 ) {
            return (
                filteredData.map((d, i) => (
                    <tr key={i}>
                        <td>{d.drug_brand_name}</td>
                        <td>{d.drug_company}</td>
                        <td>{d.drug_generic_name}</td>
                    </tr>
                ))
            )
        } else {
            // if(inputTyped === "") {
            //     if(meds) {
            //         meds.map((med, i) => (
            //             <tr key={i}>
            //                 <td>{med.drug_brand_name}</td>
            //                 <td>{med.drug_company}</td>
            //                 <td>{med.drug_generic_name}</td>
            //         </tr>))
            //     } else return null
            // } 
            return <p>No DATA</p>
        }
    }

    // set filtered data when typing search
    useEffect(() => {
        if(meds) {
            setFilteredData(meds.filter(med => med.drug_brand_name.includes(inputTyped)))
        }
    }, [inputTyped, meds])

    console.log(filteredData)

    return (
        <>
        <h2>Sample List of Drugs and Their Manufacturers</h2>
        <table className="center">
            <thead>
                <tr>
                    <th>Drug Brand Name</th>
                    <th>Drug Company</th>
                    <th>Drug Generic Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input 
                        type="text" name="brand_name" size="30"
                        value={inputTyped}
                        onChange={ e => setInputTyped(e.target.value) }
                    /></td>
                    <td><input type="text" name="company_name" size="30" value="" /></td>
                    <td><input type="text" name="generic_name" size="30" value="" /></td>

                </tr>
                {/* print rows */}
                {printMedsRows()}

            </tbody>

        </table>
        </>
    )
}

export default IndexPage