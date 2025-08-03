import EditJobForm from "../components/EditJobForm";
import React, { useEffect, useState } from 'react'
import { fetchJobs, deleteJobs } from "../api/jobAPI"
import AddJobForm from "../components/AddJobForm";

const DashBoard = () => {
    const [editingJob, setEditingJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (id) => {
        try {
            await deleteJobs(id);
            loadJobs();
        } catch (err) {
            console.error("Failed to delete jobs:", err);
        }
    };

    const loadJobs = async () => {
        try {
            const data = await fetchJobs();
            setJobs(data);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Job Applications Tracker</h1>

            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-8">
                {editingJob ? (
                    <EditJobForm
                        job={editingJob}
                        onCancel={() => setEditingJob(null)}
                        onJobUpdated={() => {
                            setEditingJob(null);
                            loadJobs();
                        }}
                    />
                ) : (
                    <AddJobForm onJobAdded={loadJobs} />
                )}

                {loading ? (
                    <p className="text-center text-gray-600">Loading ...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300 rounded-md shadow-md">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Company</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Stage</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Position</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Apply Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Response Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Job URL</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Referral</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Resume</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id} className="border-t hover:bg-gray-50 text-sm">
                                        <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{job.company}</td>
                                        <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{job.stage}</td>
                                        <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{job.position}</td>
                                        <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{job.apply_date}</td>
                                        <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{job.response_date}</td>
                                        <td className="px-4 py-2 text-blue-600 underline truncate max-w-xs">
                                            <a href={job.job_url} target="_blank" rel="noopener noreferrer">Link</a>
                                        </td>
                                        <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{job.referral ? "Yes" : "No"}</td>
                                        <td className="px-4 py-2">
                                            {job.resume ? (
                                                <a href={job.resume} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Resume</a>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                            <button onClick={() => setEditingJob(job)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                                            <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashBoard;