import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

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
        setProjectBannerPreview(project.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error loading project");
      }
    };
    getProject();
  }, [id]);

  const technologiesList = technologies ? technologies.split(", ").filter(Boolean) : [];

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-6xl w-full bg-white dark:bg-[#121212] rounded-2xl shadow-lg p-10">

        <div className="flex justify-end mb-8">
          <Button onClick={handleReturnToPortfolio} variant="outline">
            ← Back to Portfolio
          </Button>
        </div>


        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-12 text-center sm:text-left">
          {title}
        </h1>


        <div className="flex flex-col md:flex-row md:space-x-12 items-start">

          <div className="md:w-1/2 w-full mb-10 md:mb-0">
            <img
              src={projectBannerPreview || "/avatarHolder.jpg"}
              alt="Project Banner"
              className="rounded-xl shadow-xl object-contain w-full max-h-[500px]"
              loading="lazy"
            />
          </div>

          <div className="md:w-1/2 w-full text-gray-700 dark:text-gray-300 space-y-8">

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Technologies</h2>
              <ul className="list-disc list-inside space-y-2">
                {technologiesList.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </section>


            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Stack</h2>
              <p>{stack || "N/A"}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Deployed</h2>
              <p>{deployed || "N/A"}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">GitHub Repository</h2>
              {isValidUrl(gitRepoLink) ? (
                <a
                  href={gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline break-words"
                >
                  {gitRepoLink}
                </a>
              ) : (
                <p className="italic text-gray-500 dark:text-gray-400 select-text">
                  {gitRepoLink || "No repository link provided."}
                </p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Project Link</h2>
              {isValidUrl(projectLink) ? (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline break-words"
                >
                  {projectLink}
                </a>
              ) : (
                <p className="italic text-gray-500 dark:text-gray-400 select-text">
                  {projectLink || "No project link provided."}
                </p>
              )}
            </section>
          </div>
        </div>


        <div className="mt-16 bg-gray-100 dark:bg-[#1A1A1A] p-6 rounded-xl shadow-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Description</h2>
          <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {description || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
