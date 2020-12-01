// './components/IndexPage'
import React, { useState, useEffect } from 'react'
import axios from "axios";

const IndexPage = () => {
    const [meds, setMeds] = useState(null) // initial meds data
    const [inputTyped1, setInputTyped1] = useState("")
    const [inputTyped2, setInputTyped2] = useState("")
    const [inputTyped3, setInputTyped3] = useState("")

    const [filteredData, setFilteredData] = useState([]) // filtered data to display

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
            setFilteredData(result.data.meds)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchMeds()
        
    }, [])
    console.log(meds)

    // processing the filter for inputs
    useEffect(() => {
        let temp_filter_data = meds
        // drug_brand_name input
        if(inputTyped1 !== "") {
            temp_filter_data = temp_filter_data.filter(med => med.drug_brand_name.includes(inputTyped1))
        }
        // drug_company input
        if(inputTyped2 !== "") {
            temp_filter_data = temp_filter_data.filter(med => med.drug_company.includes(inputTyped2))
        }
        // drug_generic_name input
        if(inputTyped3 !== "") {
            temp_filter_data = temp_filter_data.filter(med => med.drug_generic_name.includes(inputTyped3))
        }

        setFilteredData(temp_filter_data)

    },[inputTyped1, inputTyped2, inputTyped3])

    console.log(filteredData)

    // print the rows of filtered data
    function printMedsRows () {
        return (
            <>
            {filteredData ? filteredData.map((m, i) => (
                <tr key={i}>
                    <td>{m.drug_brand_name}</td>
                    <td>{m.drug_company}</td>
                    <td>{m.drug_generic_name}</td>
                </tr>
            )) : null}
            </>
        )
    }

    return (
        <>
        <h2>Sample List of Drugs and Their Manufacturers</h2>
        <h3>(We could filter 3 input boxes at the same time)</h3>
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
                        value={inputTyped1}
                        onChange={ 
                            e => setInputTyped1(e.target.value) 
                        }
                    /></td>
                    <td><input 
                        type="text" name="brand_name" size="30"
                        value={inputTyped2}
                        onChange={ 
                            e => setInputTyped2(e.target.value) 
                        }
                    /></td>
                    <td><input type="text" name="generic_name" size="30" 
                        value={inputTyped3}
                        onChange={ 
                            e => setInputTyped3(e.target.value) 
                        } 
                    /></td>
                </tr>

                {/* print rows */}
                {printMedsRows()}

            </tbody>

        </table>
        </>
    )
}

export default IndexPage