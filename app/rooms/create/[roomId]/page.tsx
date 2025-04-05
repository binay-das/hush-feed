"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX, Copy, Plus } from "lucide-react";

interface Question {
  text: string;
  type: "TEXT" | "MULTIPLE" | "RATING";
  options: string[];
}

const RoomSetupPage = () => {
  const { roomId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuestionChange = (idx: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[idx].text = value;
    setQuestions(newQuestions);
  };

  const handleTypeChange = (idx: number, value: Question["type"]) => {
    const newQuestions = [...questions];
    newQuestions[idx].type = value;

    if (value === "MULTIPLE" && newQuestions[idx].options.length === 0) {
      newQuestions[idx].options = [""];
    } else if (value !== "MULTIPLE") {
      newQuestions[idx].options = [];
    }

    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIdx: number,
    optionIdx: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIdx].options[optionIdx] = value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIdx: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIdx].options.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (questionIdx: number, optionIdx: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIdx].options.splice(optionIdx, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "TEXT",
        options: [],
      },
    ]);
  };

  const submitQuestions = async () => {
    setLoading(true);
    setError("");

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/room/${roomId}/questions`,
        { questions },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("All questions added!");
      console.log(res);
      // router.push(`/room/${roomId}`);
    } catch (error) {
      console.error("Error saving questions", error);
      setError("Failed to save questions. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Setup Room Questions</CardTitle>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="text-sm text-muted-foreground">{roomId}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(roomId as string);
                toast.success("Room ID copied to clipboard!"); // Optional
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {questions.map((question, idx) => (
            <div key={idx} className="my-4 p-4 border rounded-md">
              <Label htmlFor={`question-${idx}`} className="mb-2">
                Question{idx + 1}
              </Label>
              <Input
                id={`question-${idx}`}
                placeholder="Enter question"
                value={question.text}
                onChange={(e) => handleQuestionChange(idx, e.target.value)}
              />

              <Label className="my-2">Question Type</Label>
              <Select
                value={question.type}
                onValueChange={(value) =>
                  handleTypeChange(idx, value as Question["type"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEXT">Short Answer</SelectItem>
                  <SelectItem value="MULTIPLE">Multiple Choice</SelectItem>
                  <SelectItem value="RATING">Rating (1-5)</SelectItem>
                </SelectContent>
              </Select>

              {question.type === "MULTIPLE" && (
                <div className="mt-4">
                  <Label>Options</Label>
                  {question.options.map((option, optionIdx) => (
                    <div
                      key={optionIdx}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <Input
                        placeholder={`Option ${optionIdx + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(idx, optionIdx, e.target.value)
                        }
                      />
                      <Button
                        variant="outline"
                        onClick={() => removeOption(idx, optionIdx)}
                      >
                        <CircleX />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => addOption(idx)}
                  >
                    <Plus /> Add Option
                  </Button>
                </div>
              )}

              {question.type === "RATING" && (
                <p className="text-sm text-gray-600 mt-2">
                  This question will have a 1-5 rating scale.
                </p>
              )}
            </div>
          ))}

          <Button variant="outline" onClick={addQuestion} className="mt-4">
            <Plus /> Add Question
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push(`/room/create/${roomId}`)}
          >
            Skip
          </Button>
          <Button onClick={submitQuestions} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomSetupPage;
