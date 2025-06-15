import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form className="w-full px-5 md:w-[650px]" onSubmit={handleAddNewTimeline}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-gray-300/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 dark:text-gray-100 text-3xl text-center">
              ADD A NEW TIMELINE
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              {[
                { label: "Title", value: title, set: setTitle, type: "text" },
                { label: "Description", value: description, set: setDescription, type: "textarea" },
                { label: "Starting Point (From)", value: from, set: setFrom, type: "number" },
                { label: "Ending Point (To)", value: to, set: setTo, type: "number" },
              ].map((field, idx) => (
                <div key={idx} className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    {field.label}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      {field.type === "textarea" ? (
                        <Textarea
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder={field.label}
                          value={field.value}
                          onChange={(e) => field.set(e.target.value)}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder={field.label}
                          value={field.value}
                          onChange={(e) => field.set(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">
              Add Timeline
            </Button>
          ) : (
            <SpecialLoadingButton content={"Adding New Timeline"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
