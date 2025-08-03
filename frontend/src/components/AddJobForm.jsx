import React, { useState } from 'react'
import { addJobs } from '../api/jobAPI'
const AddJobForm = ({ onJobAdded }) => {
    const [formData,setFormData]=useState({
    company: "",
    stage: "Applied",
    position: "",
    apply_date: "",
    response_date: "",
    job_url: "",
    referral: false,
  });
    const [resume,setResume]=useState(null)
    const [error,setError]=useState("")

    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:type==="checkbox"?checked:value,
        }))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const data=new FormData()
        Object.entries(formData).forEach(([key,value])=>{
            data.append(key,value);
        })
        if (resume) data.append("resume", resume);
        try {
            await addJobs(data)
            setFormData({
            company: "",
            stage: "Applied",
            position: "",
            apply_date: "",
            response_date: "",
            job_url: "",
            referral: false,
            });
            setResume(null);
            onJobAdded();
        } catch (err) {
            console.error("Failed to add jobs",err)
        }
        
    }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="input" />
      <select name="stage" value={formData.stage} onChange={handleChange} className="input">
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offered</option>
      </select>
      <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="input" />
      <input type="date" name="apply_date" value={formData.apply_date} onChange={handleChange} className="input" />
      <input type="date" name="response_date" value={formData.response_date} onChange={handleChange} className="input" />
      <input name="job_url" value={formData.job_url} onChange={handleChange} placeholder="Job URL" className="input" />
      <label>
        Referral?
        <input type="checkbox" name="referral" checked={formData.referral} onChange={handleChange} />
      </label>
      <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn">Submit</button>
    </form>
 

  )
}

export default AddJobForm
