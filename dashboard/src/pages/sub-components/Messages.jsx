import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Messages = () => {
  const dispatch = useDispatch();

  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState(null);

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
      setMessageId(null);
    }
  }, [message, dispatch]);

  return (
    <div className="min-h-screen px-2 sm:px-8 py-4 ml-20">
      <Tabs defaultValue="messages">
        <TabsContent value="messages">
          <Card className="bg-background text-foreground border border-border">
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {loading ? (
                <p>Loading messages...</p>
              ) : messages && messages.length > 0 ? (
                messages.map((element) => (
                  <Card
                    key={element._id}
                    className="p-4 bg-muted text-muted-foreground border border-border rounded-xl shadow-md"
                  >
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold text-foreground">Sender:</span>{" "}
                        {element.senderName}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Subject:</span>{" "}
                        {element.subject}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Message:</span>{" "}
                        {element.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sent on: {new Date(element.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <CardFooter className="justify-end mt-4 p-0">
                      {loading && messageId === element._id ? (
                        <SpecialLoadingButton content="Deleting" width="w-32" />
                      ) : (
                        <Button
                          className="w-32"
                          onClick={() => handleMessageDelete(element._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <CardHeader className="text-xl text-muted-foreground">
                  No Messages Found!
                </CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
