import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  clearAllSkillErrors,
  updateSkill,
  resetSkillSlice,
  deleteSkill,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  // We'll keep track of the slider values locally per skill for real-time display
  const [proficiencyMap, setProficiencyMap] = useState({});

  useEffect(() => {
    // Initialize proficiencyMap with current skills' proficiencies
    if (skills && skills.length > 0) {
      const map = {};
      skills.forEach((skill) => {
        map[skill._id] = skill.proficiency;
      });
      setProficiencyMap(map);
    }
  }, [skills]);

  const handleInputChange = (id, value) => {
    setProficiencyMap((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdateSkill = (id) => {
    const updatedProficiency = proficiencyMap[id];
    dispatch(updateSkill(id, updatedProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills.map((element) => (
                <Card key={element._id}>
                  <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                    {element.title}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash2
                            onClick={() => handleDeleteSkill(element._id)}
                            className="h-5 w-5 hover:text-red-500 cursor-pointer"
                          />
                        </TooltipTrigger>
                        <TooltipContent side="right" style={{ color: "red" }}>
                          Delete
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-2 w-full">
                    <Label className="text-2xl">Proficiency</Label>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={proficiencyMap[element._id] ?? element.proficiency}
                      onChange={(e) =>
                        handleInputChange(element._id, Number(e.target.value))
                      }
                      onMouseUp={() => handleUpdateSkill(element._id)}
                      className="
                        w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer
                        accent-black
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:bg-black
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:bg-black
                        [&::-moz-range-thumb]:rounded-full

                        dark:bg-gray-700
                        dark:accent-blue-400
                        dark:[&::-webkit-slider-thumb]:bg-blue-400
                        dark:[&::-moz-range-thumb]:bg-blue-400
                      "
                    />
                    <div className="text-right text-sm font-semibold select-none text-black dark:text-gray-300">
                      {proficiencyMap[element._id] ?? element.proficiency}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
