// './components/EditDeletePage'
import React, { useState } from 'react'
import axios from "axios";

const AddNewPage = () => {
    
    const [company, setCompany] = useState(null)
    const [brand, setBrand] = useState(null)
    const [generic, setGeneric] = useState(null)

    const [isSaved, setIsSaved] = useState(false)

    // onSubmit editting format
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios({
                method: "POST",
                url: `http://localhost:4000/addnew`,
                data: {
                    drug_company: company,
                    drug_brand_name: brand,
                    drug_generic_name: generic
                }
            })
            console.log(result.data.newMed)

            setIsSaved(true)
        } catch (err) {
            console.log(err)
        } 
    }


    return (
        <>
            <form onSubmit={onSubmit} className='center'>
                <label>Drug Brand Name:</label><br/>
                <input 
                    type="text" 
                    value={brand}
                    onChange={ e => setBrand(e.target.value) }
                /><br/><br/>

                <label>Drug Company:</label><br/>
                <input 
                    type="text" 
                    value={company}
                    onChange={ e => setCompany(e.target.value) }
                /><br/><br/>

                <label>Drug Generic Name:</label><br/>
                <input 
                    type="text" 
                    value={generic}
                    onChange={ e => setGeneric(e.target.value) }
                /><br/><br/>

                <input 
                    type="submit"
                    value="Submit" 
                />
            </form>
            <br/><br/>

            {isSaved ? (
                <div className='isa_success'>
                    <h4>The drug is successfully saved in the database!</h4>
                    <p>Drug Brand Name: {brand}</p>
                    <p>Drug Company: {company}</p>
                    <p>Drug Generic Name: {generic}</p>
                </div>   
            ) : null}
        </>
    )
}

export default AddNewPage