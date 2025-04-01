"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

interface Question {
  id: string;
  text: string;
  type: string;
  options: string[] | null;
}

interface Response {
  id: string;
  responseText: string;
  submittedAt: string;
  question: Question;
  respondentId: string;
}

export default function ResponsesPage() {
  const { roomId } = useParams();
  const router = useRouter();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"byRespondent" | "byQuestion">(
    "byRespondent"
  );

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await axios.get(`/api/room/${roomId}/responses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        if (res.status === 403) {
          router.push("/");
          return;
        }

        if (res.status === 200) {
          setResponses(data.responses);
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [roomId, router]);

  const groupedByRespondent = responses.reduce((acc, response) => {
    if (!acc[response.respondentId]) acc[response.respondentId] = [];
    acc[response.respondentId].push(response);
    return acc;
  }, {} as Record<string, Response[]>);

  const groupedByQuestion = responses.reduce((acc, response) => {
    if (!acc[response.question.id])
      acc[response.question.id] = {
        text: response.question.text,
        responses: [],
      };
    acc[response.question.id].responses.push(response);
    return acc;
  }, {} as Record<string, { text: string; responses: Response[] }>);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Responses</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            viewMode === "byRespondent" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setViewMode("byRespondent")}
        >
          View By Respondent
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            viewMode === "byQuestion" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setViewMode("byQuestion")}
        >
          View By Question
        </button>
      </div>

      {loading ? (
        <p>Loading responses...</p>
      ) : responses.length === 0 ? (
        <p>No responses found.</p>
      ) : viewMode === "byRespondent" ? (
        <div className="space-y-6">
          {Object.entries(groupedByRespondent).map(
            ([anonId, userResponses], index) => (
              <div key={anonId} className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Anonymous {index + 1}
                </h3>
                {userResponses.map((response) => (
                  <div
                    key={response.id}
                    className="border-b border-gray-600 pb-2 mb-2"
                  >
                    <p className="font-semibold">{response.question.text}</p>
                    <p className="text-sm text-gray-400">
                      Answered: {response.responseText}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted:{" "}
                      {new Date(response.submittedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByQuestion).map(
            ([questionId, questionData]) => (
              <div key={questionId} className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {questionData.text}
                </h3>
                {questionData.responses.map((response, index) => (
                  <div
                    key={response.id}
                    className="border-b border-gray-600 pb-2 mb-2"
                  >
                    <p className="text-sm text-gray-400">
                      Anonymous {index + 1}: {response.responseText}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted:{" "}
                      {new Date(response.submittedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
