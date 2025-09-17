import React, { useState, useEffect } from "react";
import { BaseLiner } from "./BaseLiner";
import { InputTextArea } from "./InputTextArea";
import { LogicPercentage } from "./LogicPercentage";
import { Timer } from "./Timer";
import "./tailwind.css";

export const Desktop = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const interviewId = "68bdd46c1d00caab09b2e449";

useEffect(() => {
  fetch(`http://localhost:5000/interview/${interviewId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("📥 Fetched data:", data);

      // data is already an array of modules
      const allQuestions = data.flatMap((module) =>
        module.questions.map((q) => ({
          ...q,
          module_id: module._id,
          moduleTitle: module.title,
        }))
      );

      setQuestions(allQuestions);

      if (data.answers) setAnswers(data.answers); // optional if your backend adds "answers"
    })
    .catch((err) => console.error(err));
}, []);



  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentIndex];

  // ✅ Update answer in state
  const handleAnswerChange = (value) => {
    console.log(`✏️ Answer for QID ${currentQuestion._id}:`, value);
    setAnswers((prev) => {
      const updated = { ...prev, [currentQuestion._id]: value };
      console.log("Updated answers:", updated); // Debug log
      return updated;
    });
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // ✅ Submit all answers to backend
const handleSubmit = () => {
  // Build array of {module_id, question_id, answer}
  const payload = {
    answers: questions.map((q) => ({
      module_id: q.module_id || q.module, // add module_id when flattening
      question_id: q._id,
      answer: answers[q._id] || ""
    }))
  };

  console.log("📤 Submitting payload:", payload);

  fetch(`http://localhost:5000/interview/${interviewId}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Saved in DB:", data);
      alert("Answers submitted successfully!");
    })
    .catch((err) => console.error("❌ Error:", err));
};


  // Progress percentage
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="w-full h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(10,10,13,1)_0%,rgba(54,56,115,1)_100%)] bg-no-repeat bg-cover bg-center relative">
      
      {/* Module title */}
      <div className="absolute top-1/9 left-1/5 transform -translate-x-1/2 font-bold text-[#cfcfcf] text-[48px] tracking-[0] leading-[normal]">
        Module: {currentQuestion.moduleTitle}
      </div>

      {/* Timer */}
      <Timer
        initialMinutes={0}
        initialSeconds={5}
        className="absolute top-[61px] left-[1300px]"
        onComplete={() => console.log("Timer finished")}
      />

      {/* Navigation buttons */}
      <div className="absolute flex gap-4 top-[640px] left-[29px]">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>

      {/* Question / Textarea */}
      <div className="flex-col w-[1178px] gap-4 absolute top-[254px] left-[98px] flex items-start">
        <div className="font-bold text-[#cfcfcf] text-2xl">
          {currentIndex + 1} - {currentQuestion.question}
        </div>
        <InputTextArea
          placeholder="Type here"
          value={answers[currentQuestion._id] || ""}
          onChange={handleAnswerChange}  
          className="!self-stretch !h-[324px] !w-full"
        />
      </div>

      {/* Progress bar */}
      <div className="flex flex-col w-[837px] h-[49px] items-start gap-2.5 px-4 py-2.5 absolute top-[660px] left-[268px] bg-white rounded-[29px] overflow-hidden">
        <BaseLiner
          className="!self-stretch !flex-1 !w-full"
          property1={progress + "%"}
        />
        <LogicPercentage
          className="!absolute !left-[405px] !top-[13px]"
          divClassName="!text-[#3d6004]"
          property1={progress + "%"}
        />
      </div>
    </div>
  );
};
