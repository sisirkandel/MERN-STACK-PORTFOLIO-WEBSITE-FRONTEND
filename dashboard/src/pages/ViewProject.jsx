import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      }
    };
    getProject();
  }, [id]);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description ? description.split(". ").filter(Boolean) : [];
  const technologiesList = technologies ? technologies.split(", ").filter(Boolean) : [];

  // Utility to check if deployed is truthy (yes/true)
  const isDeployed = /^true|yes$/i.test(deployed);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-5 bg-gray-50 dark:bg-[#0A0A0A] dark:text-white transition-colors duration-300">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 transition-colors duration-300">
        <div className="flex justify-end mb-6">
          <Button onClick={handleReturnToDashboard}>Return to Dashboard</Button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h1>

        <div className="mb-8">
          <img
            src={projectBanner || "/avatarHolder.jpg"}
            alt="Project Banner"
            className="w-full max-h-96 object-contain rounded-lg shadow-sm"
          />
        </div>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Description</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {descriptionList.length > 0 ? (
              descriptionList.map((item, idx) => <li key={idx}>{item.trim()}</li>)
            ) : (
              <li>No description available.</li>
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Technologies</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {technologiesList.length > 0 ? (
              technologiesList.map((tech, idx) => <li key={idx}>{tech.trim()}</li>)
            ) : (
              <li>No technologies listed.</li>
            )}
          </ul>
        </section>

        <section className="mb-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-1 text-gray-800 dark:text-gray-200">Stack</h2>
          <p>{stack || "Not specified"}</p>
        </section>

        <section className="mb-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-1 text-gray-800 dark:text-gray-200">Deployed</h2>
          <p>{deployed || "Not specified"}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Github Repository Link</h2>
          {(gitRepoLink && isDeployed) ? (
            <a
              href={gitRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline break-all"
            >
              {gitRepoLink}
            </a>
          ) : (
            <p className="text-gray-600 dark:text-gray-500 cursor-not-allowed select-none">
              {gitRepoLink || "No repository link available."}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Project Link</h2>
          {(projectLink && isDeployed) ? (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline break-all"
            >
              {projectLink}
            </a>
          ) : (
            <p className="text-gray-600 dark:text-gray-500 cursor-not-allowed select-none">
              {projectLink || "No project link available."}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewProject;
