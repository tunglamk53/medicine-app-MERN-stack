// './components/EditDeletePage'
import React, { useState, useEffect } from 'react'
import axios from "axios";

const EditDeletePage = () => {
    const [meds, setMeds] = useState(null)
    const [deletedMed, setDeletedMed] = useState({ isDeleted: false, message: null })

    const [onEditClick, setOnEditClick] = useState({ isEdited: false, onEditClick: false, message: null })
    const [company, setCompany] = useState(null)
    const [brand, setBrand] = useState(null)
    const [generic, setGeneric] = useState(null)
    const [id, setId] = useState(null)



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
    function printMedsRows() {
        return (
            <>
            {meds ? 
            meds.map((med, i) => (
                <tr key={i}>
                    <td>{med.drug_brand_name}</td>
                    <td>{med.drug_company}</td>
                    <td>{med.drug_generic_name}</td>
                    <td>
                        <button onClick={() => onEdit(med)}>
                            Edit
                        </button>
                        <button onClick={() => onDelete(med._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )) : null}
            </>
        ) 
    }

    // onClick deleting a med by id
    const onDelete = async (id) => {
        try {
            const result = await axios({
                method: "DELETE",
                url: `http://localhost:4000/${id}`
            })
            setDeletedMed({ isDeleted: true, message: result.data.message }) // set deletedMed be TRUE and message

            console.log(result.data.message)

            setOnEditClick({ onEditClick: false })
            fetchMeds() //fetch a new Meds after deleting
        } catch (err) {
            console.log(err)
        }
    }


    // onClick editing a med by id
    const onEdit = (med) => {
        try {
            setOnEditClick({ onEditClick: true })
            setId(med._id)
            setCompany(med.drug_company)
            setBrand(med.drug_brand_name)
            setGeneric(med.drug_generic_name)
        } catch (err) {
            console.log(err)
        }
    }

    // onSubmit editting format
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios({
                method: "PATCH",
                url: `http://localhost:4000/${id}`,
                data: {
                    drug_company: company,
                    drug_brand_name: brand,
                    drug_generic_name: generic
                }
            })

            // set edited to display message
            setOnEditClick({ isEdited: true, onEditClick: true, message: result.data.message })

            fetchMeds() //fetch a new Meds after deleting
        } catch (err) {
            console.log(err)
        } 
    }

    // display edit form
    function displayEditForm() {
        return(
            <>
            <form onSubmit={onSubmit} className='center'>
                <label>Drug Brand Name</label><br/>
                <input 
                    type="text" 
                    value={brand}
                    onChange={ e => setBrand(e.target.value) }
                /><br/><br/>

                <label>Drug Company</label><br/>
                <input 
                    type="text" 
                    value={company}
                    onChange={ e => setCompany(e.target.value) }
                /><br/><br/>

                <label>Drug Generic Name</label><br/>
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
            <br/>

            {/* Hide the Edit form */}
            <div className='center'>
                <button onClick={() => setOnEditClick({ onEditClick: false })}>
                    Cancel
                </button>
            </div>
            </>
        )
    }

    // return HTML
    return (
        <>
        {/* if deleted successfully */}
        {deletedMed.isDeleted ? (
            <p className='isa_success'>{deletedMed.message}</p>
        ) : null}

        {/* if edited successfully */}
        {onEditClick.isEdited ? (
            <p className='isa_success'>{onEditClick.message}</p>
        ) : null}

        <h2>Sample List of Drugs and Their Manufacturers</h2>

        {/* show edit form when clicking on edit button */}
        {onEditClick.onEditClick ? displayEditForm() : null}

        <table className="center">
            <thead>
                <tr>
                    <th>Drug Brand Name</th>
                    <th>Drug Company</th>
                    <th>Drug Generic Name</th>
                    <th colspan="2">Action</th>
                </tr>
            </thead>
            <tbody>

                {/* print rows */}
                {printMedsRows()}
                
            </tbody>
        </table>
        </>
    )
}

export default EditDeletePage