import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";

const Dashboard = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [appId, setAppId] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { skills, loading: skillLoading, error: skillError, message: skillMessage } = useSelector((state) => state.skill);
  const { softwareApplications, loading: appLoading, error: appError, message: appMessage } = useSelector((state) => state.softwareApplications);
  const { timeline, loading: timelineLoading, error: timelineError, message: timelineMessage } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector((state) => state.project);

  const gotoMangeSkills = () => navigateTo("/manage/skills");
  const gotoMangeTimeline = () => navigateTo("/manage/timeline");
  const gotoMangeProjects = () => navigateTo("/manage/projects");

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (skillError) toast.error(skillError), dispatch(clearAllSkillErrors());
    if (appError) toast.error(appError), dispatch(clearAllSoftwareAppErrors());
    if (projectError) toast.error(projectError), dispatch(clearAllProjectErrors());
    if (timelineError) toast.error(timelineError), dispatch(clearAllTimelineErrors());

    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
    projectError,
  ]);

  return (
    <div className="w-full px-4 md:pl-20 py-4 max-w-[1400px] mx-auto">
      <main className="w-full">
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 md:gap-8 lg:col-span-2">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => window.location.href = "http://localhost:5174/"}>
                    Visit Portfolio
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg">Projects Completed</CardTitle>
                  <CardTitle className="text-4xl sm:text-5xl">
                    {projects?.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg">Skills</CardTitle>
                  <CardTitle className="text-4xl sm:text-5xl">
                    {skills?.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Projects Table */}
            <Card>
              <CardHeader className="px-4 sm:px-7">
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table className="min-w-[400px] sm:min-w-full w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Stack</TableHead>
                      <TableHead className="hidden md:table-cell">Deployed</TableHead>
                      <TableHead>Update</TableHead>
                      <TableHead className="text-right">Visit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects?.length ? (
                      projects.map((element) => (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell className="font-medium truncate max-w-[150px] sm:max-w-full">{element.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{element.stack}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className="text-xs" variant="secondary">{element.deployed}</Badge>
                          </TableCell>
                          <TableCell>
                            <Link to={`/update/project/${element._id}`}>
                              <Button>Update</Button>
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">
                            <a href={`http://localhost:5174/project/${element._id}`} target="_blank" rel="noopener noreferrer">
                              <Button>Visit</Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-lg">You have not added any project.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card>
              <CardHeader className="px-4 sm:px-7">
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills?.length ? (
                  skills.map((element) => (
                    <Card key={element._id}>
                      <CardHeader>{element.title}</CardHeader>
                      <CardFooter>
                        <Progress value={element.proficiency} />
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <p className="text-lg">You have not added any skill.</p>
                )}
              </CardContent>
            </Card>

            {/* Software Applications and Timeline */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Software Apps */}
              <Card>
                <CardHeader className="px-4 sm:px-7">
                  <CardTitle>Software Applications</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table className="min-w-[400px] sm:min-w-full w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="md:table-cell">Icon</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {softwareApplications?.length ? (
                        softwareApplications.map((element) => (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell className="font-medium">{element.name}</TableCell>
                            <TableCell className="md:table-cell">
                              <img className="w-7 h-7" src={element.svg?.url} alt={element.name} />
                            </TableCell>
                            <TableCell className="text-center">
                              {appLoading && appId === element._id ? (
                                <SpecialLoadingButton content="Deleting" width="w-fit" />
                              ) : (
                                <Button onClick={() => handleDeleteSoftwareApp(element._id)}>Delete</Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-lg">You have not added any software app.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader className="px-4 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Timeline</CardTitle>
                  <Button onClick={gotoMangeTimeline} className="w-fit mt-2 sm:mt-0">
                    Manage Timeline
                  </Button>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table className="min-w-[400px] sm:min-w-full w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="md:table-cell">From</TableHead>
                        <TableHead className="text-right">To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeline?.length ? (
                        timeline.map((element) => (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell className="font-medium">{element.title}</TableCell>
                            <TableCell className="md:table-cell">{element.timeline.from}</TableCell>
                            <TableCell className="text-right">{element.timeline.to}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-lg">You have not added any timeline.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
