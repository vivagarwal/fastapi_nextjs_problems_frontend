import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

// Dynamically import the Editor component
const Editor = dynamic(() => import("react-simple-code-editor"), { ssr: false });

const ProblemDetails = ({ id }) => {
  const [problemDescription, setProblemDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    document.body.spellcheck = false;
    return () => {
      document.body.spellcheck = true;
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProblemDescription = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-problem-description/${id}`
        );
        const htmlContent = await response.text();
        setProblemDescription(htmlContent);
      } catch (error) {
        console.error("Error fetching problem description:", error);
      }
    };

    fetchProblemDescription();
  }, [id]);

  const handleRun = async () => {
    if (!id) {
      setOutput("Error: Problem ID is missing.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error: An unexpected error occurred");
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      setOutput("Error: Problem ID is missing.");
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(id),
          language,
          code,
        }),
      });
      const data = await response.json();
      setSubmitResult(data);
    } catch (error) {
      console.error("Error submitting code:", error);
      setSubmitResult({
        success: false,
        status: "Error",
        message: "An unexpected error occurred"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      <h1 className="text-2xl font-bold mb-4">Problem Description</h1>
      <div className="w-1/2 p-6 overflow-y-auto">
        <div
          dangerouslySetInnerHTML={{ __html: problemDescription }}
          className="problem-description"
        />
      </div>

      <div className="w-1/2 p-6 bg-gray-800 text-white">
        <h3 className="text-white font-bold mb-4">Compile Genie</h3>
        <div className="mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
        </div>
        <div
          className="bg-gray-900 text-white shadow-md w-full mb-4 rounded-md"
          style={{ height: "30vh", overflowY: "auto", overflowX: "auto" }}
          ref={editorRef}
        >
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              highlight(code, languages[language] || languages.clike)
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
              minHeight: "30vh",
            }}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Custom Input:</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-1/6 p-4 bg-gray-700 text-white font-mono rounded"
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleRun}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Run Code
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Output:</h3>
          <textarea
            value={output}
            readOnly
            className="w-full h-1/6 p-4 bg-gray-700 text-white font-mono rounded"
          />
        </div>

        {submitResult && (
          <div className={`mt-4 p-4 rounded ${
            submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <h3 className="text-lg font-semibold">{submitResult.status}</h3>
            <p>{submitResult.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return { props: { id } };
}

export default ProblemDetails;