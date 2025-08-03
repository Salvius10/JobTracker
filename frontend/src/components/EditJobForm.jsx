import React, { useState, useEffect } from "react";
import { updateJobs } from "../api/jobAPI";

const EditJobForm = ({ job, onCancel, onJobUpdated }) => {
  const [formData, setFormData] = useState({
    company: "",
    stage: "Applied",
    position: "",
    apply_date: "",
    response_date: "",
    job_url: "",
    referral: false,
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  // Fill the form with job data when job prop changes
  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        stage: job.stage || "Applied",
        position: job.position || "",
        apply_date: job.apply_date || "",
        response_date: job.response_date || "",
        job_url: job.job_url || "",
        referral: job.referral || false,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (resume) data.append("resume", resume);

    try {
      await updateJobs(job.id, data);  // Use job.id to update the correct record
      onJobUpdated(); // Tell parent to refresh job list
      onCancel();     // Close the edit form
    } catch (err) {
      console.error("Failed to update job", err);
      setError("Update failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <h2 className="text-lg font-bold">Edit Job</h2>
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
      <button type="submit" className="btn">Update</button>
      <button type="button" onClick={onCancel} className="btn ml-2 bg-gray-300">Cancel</button>
    </form>
  );
};

export default EditJobForm;
