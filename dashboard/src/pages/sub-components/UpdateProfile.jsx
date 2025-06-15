import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [xURL, setXURL] = useState(
    user && (user.xURL === "undefined" ? "" : user.xURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("xURL", xURL); // Updated here for Twitter(X) URL
    formData.append("facebookURL", facebookURL);
    if (avatar && typeof avatar !== "string") {
      formData.append("avatar", avatar);
    }
    if (resume && typeof resume !== "string") {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="text-balance text-muted-foreground">
              Update Your Profile Here
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              {/* Avatar Section */}
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <Button
                  onClick={() => document.getElementById("avatarInput").click()}
                  className="mt-2 font-bold bg-gray-300 text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Choose New Avatar
                </Button>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={avatarHandler}
                  className="hidden"
                />
              </div>

              {/* Resume Section */}
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                {resumePreview ? (
                  <img
                    src={resumePreview}
                    alt="resume preview"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                ) : (
                  <p>No resume uploaded</p>
                )}
                <Button
                  onClick={() => document.getElementById("resumeInput").click()}
                  className="mt-2 font-bold bg-gray-300 text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Choose New Resume
                </Button>
                <input
                  id="resumeInput"
                  type="file"
                  accept="image/*"
                  onChange={resumeHandler}
                  className="hidden"
                />
              </div>
            </div>

            {/* Other Profile Fields */}
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio URL</Label>
              <Input
                type="text"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                value={linkedInURL}
                onChange={(e) => setLinkedInURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input
                type="text"
                value={githubURL}
                onChange={(e) => setGithubURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                type="text"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Twitter (X) URL</Label>
              <Input
                type="text"
                value={xURL}
                onChange={(e) => setXURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input
                type="text"
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
              />
            </div>

            {!loading ? (
              <Button onClick={handleUpdateProfile} className="w-full">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
