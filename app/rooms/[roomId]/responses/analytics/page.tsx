"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: "TEXT" | "MULTIPLE" | "RATING";
  options: string[];
}

interface Answer {
  questionId: string;
  value: string; // could be rating number or text/option
}

export default function RoomAnalyticsPage() {
  const { roomId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const [qRes, aRes] = await Promise.all([
          axios.get(`${NEXT_PUBLIC_BASE_URL}/api/room/${roomId}/questions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${NEXT_PUBLIC_BASE_URL}/api/room/${roomId}/responses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        const normalizedAnswers: Answer[] = aRes.data.responses.map((r: any) => ({
          questionId: r.question.id,
          value: r.responseText,
        }));
  
        setQuestions(qRes.data.questions);
        setAnswers(normalizedAnswers);
      } catch (err) {
        console.error("Error fetching analytics", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalytics();
  }, [roomId]);
  

  const getAnswersForQuestion = (questionId: string) =>
    answers.filter((a) => a.questionId === questionId);

  const groupAnswers = (question: Question) => {
    const questionAnswers = getAnswersForQuestion(question.id);
    const counts: { [key: string]: number } = {};

    if (question.type === "RATING") {
      for (let i = 1; i <= 5; i++) counts[i] = 0;
    }

    questionAnswers.forEach((a) => {
      const key = a.value;
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts).map(([key, value]) => ({
      name: key,
      count: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">Room Analytics</h1>

      {questions.map((question) => {
        const responses = getAnswersForQuestion(question.id);
        const grouped = groupAnswers(question);

        return (
          <Card key={question.id} className="mb-6">
            <CardHeader>
              <CardTitle>{question.text}</CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "TEXT" && (
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {responses.map((r, idx) => (
                    <li key={idx}>{r.value}</li>
                  ))}
                </ul>
              )}

              {(question.type === "MULTIPLE" || question.type === "RATING") && grouped.length > 0 && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={grouped}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {responses.length === 0 && (
                <p className="text-sm text-muted-foreground">No responses yet.</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
