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

  // Fetch Questions for the Room
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

  // Update Responses
  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) =>
      prev.map((resp) => (resp.questionId === questionId ? { ...resp, responseText: value } : resp))
    );
  };

  // Submit Responses
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
      console.log("Responses submitted!");
      router.push(`/room/${roomId}/thank-you`);
    } catch (error) {
      console.error("Error submitting responses", error);
      setError("Failed to submit responses.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Answer Room Questions</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.map((question) => (
            <div key={question.id} className="my-4 p-4 border rounded-md">
              <Label>{question.text}</Label>

              {/* TEXT TYPE */}
              {question.type === "TEXT" && (
                <Input
                  placeholder="Type your answer..."
                  value={responses.find((r) => r.questionId === question.id)?.responseText || ""}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                />
              )}

              {/* MULTIPLE CHOICE */}
              {question.type === "MULTIPLE" && (
                <RadioGroup
                  value={responses.find((r) => r.questionId === question.id)?.responseText || ""}
                  onValueChange={(value) => handleResponseChange(question.id, value)}
                  className="space-y-2"
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <Label>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* RATING TYPE */}
              {question.type === "RATING" && (
                <Slider
                  defaultValue={[3]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => handleResponseChange(question.id, value[0].toString())}
                  className="mt-2"
                />
              )}
            </div>
          ))}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push(`/room/${roomId}`)}>
            Cancel
          </Button>
          <Button onClick={submitResponses} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomAnswerPage;
