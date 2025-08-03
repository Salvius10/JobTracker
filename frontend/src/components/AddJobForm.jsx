import React, { useState } from 'react'
import { addJobs } from '../api/jobAPI'

const AddJobForm = ({ onJobAdded }) => {
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

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (resume) data.append("resume", resume);

    try {
      await addJobs(data);
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
      setError("");
      onJobAdded();
    } catch (err) {
      console.error("Failed to add jobs", err.response?.data || err);
      setError("Failed to submit form. Check all required fields.");
    }
  };

  return (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
            name="company"
            type="text"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="input border p-3 rounded-lg shadow-sm"
        />

        <select
            name="stage"
            required
            value={formData.stage}
            onChange={handleChange}
            className="input border p-3 rounded-lg shadow-sm"
        >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offered</option>
        </select>

        <input
            name="position"
            type="text"
            required
            value={formData.position}
            onChange={handleChange}
            placeholder="Position"
            className="input border p-3 rounded-lg shadow-sm"
        />

        <input
            type="date"
            name="apply_date"
            required
            value={formData.apply_date}
            onChange={handleChange}
            className="input border p-3 rounded-lg shadow-sm"
        />

        <input
            type="date"
            name="response_date"
            required
            value={formData.response_date}
            onChange={handleChange}
            className="input border p-3 rounded-lg shadow-sm"
        />

        <input
            type="url"
            name="job_url"
            required
            value={formData.job_url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="input border p-3 rounded-lg shadow-sm"
        />

        <label className="flex items-center gap-2 col-span-1">
            <input
            type="checkbox"
            name="referral"
            checked={formData.referral}
            onChange={handleChange}
            className="w-5 h-5"
            />
            <span className="text-sm text-gray-700">Referred?</span>
        </label>

        <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="input file:border file:border-gray-300 file:rounded-lg file:p-2 file:bg-white"
        />

        {error && <p className="text-red-500 col-span-2">{error}</p>}

        <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow"
        >
            Submit Application
        </button>
</form>
  );
};

export default AddJobForm;
