import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";  // Import the theme hook

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [isCustomStack, setIsCustomStack] = useState(false);
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { theme } = useTheme();  // Get current theme

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const p = res.data.project;
        setTitle(p.title);
        setDescription(p.description);
        setStack(p.stack);
        setIsCustomStack(!["Full Stack", "Mern", "Mean", "Next.JS", "React.JS"].includes(p.stack));
        setDeployed(p.deployed);
        setTechnologies(p.technologies);
        setGitRepoLink(p.gitRepoLink);
        setProjectLink(p.projectLink);
        setProjectBanner(p.projectBanner?.url || "");
        setProjectBannerPreview(p.projectBanner?.url || "");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch project");
      }
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error, dispatch]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  // Conditional classes based on theme
  const containerClass =
    theme === "dark"
      ? "min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4 py-12"
      : "min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center px-4 py-12";

  const formClass =
    theme === "dark"
      ? "bg-[#1A1A1A] shadow-lg rounded-lg max-w-4xl w-full p-8 space-y-8"
      : "bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 space-y-8";

  const inputClass =
    theme === "dark"
      ? "w-full rounded-md border border-gray-600 bg-[#1A1A1A] text-white px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      : "w-full rounded-md border border-gray-300 bg-white text-black px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

  const selectTriggerClass =
    theme === "dark"
      ? "w-full rounded-md border border-gray-600 bg-[#1A1A1A] text-white px-3 py-2 focus:ring-1 focus:ring-indigo-500"
      : "w-full rounded-md border border-gray-300 bg-white text-black px-3 py-2 focus:ring-1 focus:ring-indigo-500";

  const selectContentClass = theme === "dark" ? "bg-[#1A1A1A] text-white" : "bg-white text-black";

  const buttonClass =
    theme === "dark"
      ? "w-52 rounded-md bg-black px-6 py-3 text-white font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      : "w-52 rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

  return (
    <div className={containerClass}>
      <form onSubmit={handleUpdateProject} className={formClass}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-wide">
            Update Project
          </h2>
          <Button
            variant="outline"
            onClick={handleReturnToDashboard}
            className={theme === "dark" ? "text-white bg-black hover:bg-gray-300 hover:text-black" : ""}
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Banner */}
        <div>
          <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
            Project Banner
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              src={projectBannerPreview || "/avatarHolder.jpg"}
              alt="projectBanner"
              className="w-full sm:w-72 h-44 object-contain rounded-md border border-gray-600 shadow-sm"
            />
            <label
              htmlFor="projectBannerUpload"
              className={`inline-block cursor-pointer rounded-md px-5 py-3 font-semibold shadow-md transition-colors select-none ${
                theme === "dark"
                  ? "bg-black text-white hover:bg-gray-300 hover:text-black"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Choose File
            </label>
            <input
              id="projectBannerUpload"
              type="file"
              accept="image/*"
              onChange={handleProjectBanner}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="MERN STACK PORTFOLIO"
              className={inputClass}
            />
          </div>

          {/* Stack */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Stack
            </label>
            {isCustomStack ? (
              <input
                type="text"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder="Enter custom stack"
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                className={inputClass}
              />
            ) : (
              <Select
                value={stack}
                onValueChange={(val) => {
                  if (val === "Others") {
                    setIsCustomStack(true);
                    setStack("");
                  } else {
                    setStack(val);
                    setIsCustomStack(false);
                  }
                }}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select Project Stack" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="Mern">MERN</SelectItem>
                  <SelectItem value="Mean">MEAN</SelectItem>
                  <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                  <SelectItem value="React.JS">REACT.JS</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Technologies */}
          <div className="sm:col-span-2">
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Technologies Used
            </label>
            <Textarea
              placeholder="HTML, CSS, JAVASCRIPT, REACT"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Description
            </label>
            <Textarea
              placeholder="Feature 1. Feature 2. Feature 3."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Deployed */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Deployed On
            </label>
            <input
              type="text"
              value={deployed}
              onChange={(e) => setDeployed(e.target.value)}
              placeholder="Vercel, Netlify"
              className={inputClass}
            />
          </div>

          {/* Git Repo Link */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Git Repo Link
            </label>
            <div className="flex items-center gap-2">
              <Link size={18} className={`${theme === "dark" ? "text-white" : "text-gray-700"}`} />
              <input
                type="text"
                value={gitRepoLink}
                onChange={(e) => setGitRepoLink(e.target.value)}
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Project Link */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
              Project Link
            </label>
            <input
              type="text"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="https://projectsite.com"
              className={inputClass}
            />
          </div>
        </div>

                <div className="flex justify-end">
          {loading ? (
            <SpecialLoadingButton content={"Updating"} width={"w-52"} />
          ) : (
            <button
              type="submit"
              className={`w-52 rounded-md px-6 py-3 font-semibold shadow-md transition
                ${
                  theme === "dark"
                    ? "bg-black text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                }
              `}
            >
              Update
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default UpdateProject;
