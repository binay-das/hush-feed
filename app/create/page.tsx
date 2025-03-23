"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Eye, Settings, ListChecks } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  anonymous: z.boolean().default(true),
  questions: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["multiple", "text", "rating"]),
      question: z.string().min(1, "Question is required"),
      options: z.array(z.string()).optional(),
      required: z.boolean().default(false),
    })
  ),
});

type QuestionType = {
  id: string;
  type: "MULTIPLE" | "TEXT" | "RATING";
  question: string;
  options?: string[];
  required: boolean;
};

export default function CreateRoom() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [activeTab, setActiveTab] = useState("edit");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      anonymous: true,
      questions: [],
    },
  });

  const addQuestion = (type: QuestionType["type"]) => {
    const newQuestion: QuestionType = {
      id: uuidv4(),
      type,
      question: "",
      options: type === "MULTIPLE" ? [""] : undefined,
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, options: [...(q.options || []), ""] }
          : q
      )
    );
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options?.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options?.filter((_, idx) => idx !== optionIndex),
            }
          : q
      )
    );
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Create Voting Room</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter room title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter room description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="anonymous"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Anonymous Voting</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Hide voter identities
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Questions</h2>
                      <Select
                        onValueChange={(value: QuestionType["type"]) =>
                          addQuestion(value)
                        }
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Add Question" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Choice</SelectItem>
                          <SelectItem value="multiple">Multiple Choice</SelectItem>
                          <SelectItem value="text">Text Response</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={question.id} className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="font-medium">
                                  Question {index + 1}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {question.type.charAt(0).toUpperCase() +
                                    question.type.slice(1)}{" "}
                                  type
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeQuestion(question.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <Input
                              placeholder="Enter your question"
                              value={question.question}
                              onChange={(e) =>
                                setQuestions(
                                  questions.map((q) =>
                                    q.id === question.id
                                      ? { ...q, question: e.target.value }
                                      : q
                                  )
                                )
                              }
                            />

                            {question.type === "MULTIPLE" && (
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <Input
                                      placeholder={`Option ${optionIndex + 1}`}
                                      value={option}
                                      onChange={(e) =>
                                        updateOption(
                                          question.id,
                                          optionIndex,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        removeOption(question.id, optionIndex)
                                      }
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => addOption(question.id)}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Option
                                </Button>
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={question.required}
                                onCheckedChange={(checked) =>
                                  setQuestions(
                                    questions.map((q) =>
                                      q.id === question.id
                                        ? { ...q, required: checked }
                                        : q
                                    )
                                  )
                                }
                              />
                              <Label>Required</Label>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit">Create Room</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="preview">
              <Card className="p-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {form.watch("title") || "Untitled Room"}
                    </h2>
                    <p className="text-muted-foreground">
                      {form.watch("description") || "No description provided"}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <div key={question.id} className="space-y-4">
                        <h3 className="font-medium">
                          {question.question || `Question ${index + 1}`}
                          {question.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </h3>

                        {/* {question.type === "single" && (
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  className="text-primary"
                                  disabled
                                />
                                <span>{option || `Option ${optionIndex + 1}`}</span>
                              </div>
                            ))}
                          </div>
                        )} */}

                        {question.type === "MULTIPLE" && (
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  className="text-primary"
                                  disabled
                                />
                                <span>{option || `Option ${optionIndex + 1}`}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "TEXT" && (
                          <Textarea
                            placeholder="Your answer"
                            disabled
                            className="max-w-lg"
                          />
                        )}

                        {question.type === "RATING" && (
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <Button
                                key={rating}
                                variant="outline"
                                size="lg"
                                className="w-12 h-12"
                                disabled
                              >
                                {rating}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}