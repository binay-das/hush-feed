"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Loader2, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  text: string;
  type: "TEXT" | "MULTIPLE" | "RATING";
  options: string[];
}

interface Response {
  questionId: string;
  responseText: string;
}

const RoomAnswerPage = () => {
  const { roomId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/room/${roomId}/questions`);
        setQuestions(data.questions);
        setResponses(data.questions.map((q: Question) => ({ questionId: q.id, responseText: "" })));
      } catch (error) {
        console.error("Error fetching questions", error);
        setError("Failed to load questions.");
      }
    };

    fetchQuestions();
  }, [roomId]);

  useEffect(() => {
    const answeredQuestions = responses.filter(r => r.responseText.trim() !== "").length;
    setProgress((answeredQuestions / questions.length) * 100);
  }, [responses, questions]);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) =>
      prev.map((resp) => (resp.questionId === questionId ? { ...resp, responseText: value } : resp))
    );
  };

  const submitResponses = async () => {
    setLoading(true);
    setError("");

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/room/${roomId}/responses`,
        { responses },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      router.push(`/room/${roomId}/thank-you`);
    } catch (error) {
      console.error("Error submitting responses", error);
      setError("Failed to submit responses.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push(`/room/${roomId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Room
          </Button>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Room Questions</h1>
            <p className="text-muted-foreground">
              Please answer all questions to complete the session
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle>Progress</CardTitle>
                  <div className="mt-2">
                    <Progress value={progress} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(progress)}% complete
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <Label className="text-base">{question.text}</Label>

                      {question.type === "TEXT" && (
                        <Input
                          placeholder="Type your answer..."
                          value={responses.find((r) => r.questionId === question.id)?.responseText || ""}
                          onChange={(e) => handleResponseChange(question.id, e.target.value)}
                          className="mt-2"
                        />
                      )}

                      {question.type === "MULTIPLE" && (
                        <RadioGroup
                          value={responses.find((r) => r.questionId === question.id)?.responseText || ""}
                          onValueChange={(value) => handleResponseChange(question.id, value)}
                          className="space-y-2 mt-2"
                        >
                          {question.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                              <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {question.type === "RATING" && (
                        <div className="space-y-2 mt-4">
                          <Slider
                            defaultValue={[3]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => handleResponseChange(question.id, value[0].toString())}
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>1</span>
                            <span>5</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {index < questions.length - 1 && <Separator />}
                </div>
              ))}

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mt-4">
                  {error}
                </div>
              )}
            </CardContent>

            <Separator />
            <CardFooter className="flex justify-between p-6">
              <Button
                variant="outline"
                onClick={() => router.push(`/room/${roomId}`)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={submitResponses}
                disabled={loading || progress < 100}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Responses"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default RoomAnswerPage;