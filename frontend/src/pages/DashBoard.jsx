// company , stage, position , apply_date , response_date , job_url , referral ,resume, actions

import React, { useEffect, useState } from 'react'
import {fetchJobs} from "../api/jobAPI"
const DashBoard = () => {
    const [jobs,setJobs]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const loadJobs=async (e)=>{
            try {
                const data=await fetchJobs()
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs:",err)
            }
            finally{
                setLoading(false)
            }
        }
        loadJobs();
    },[])
  return (
    <div>
      <h1>Job Applications</h1>
      {loading? <p>Loading ...</p>:(
      <div>
        <table>
            <thead>
                <tr>
                    <td>Company</td>
                    <td>Stage</td>
                    <td>Position</td>
                    <td>Apply Date</td>
                    <td>Response Date</td>
                    <td>Job URL</td>
                    <td>Referral</td>
                    <td>Resume</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job)=>(
                    <tr key={job.id}>
                        <td>{job.company}</td>
                        <td>{job.stage}</td>
                        <td>{job.position}</td>
                        <td>{job.apply_date}</td>
                        <td>{job.response_date}</td>
                        <td>{job.job_url}</td>
                        <td>{job.referral}</td>
                        <td>{job.resume}</td>
                        <td>
                            <button>Add</button>
                            <button>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

export default DashBoard
