import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";
// import { useRouter } from 'next/router';

const ProblemDetails = ({ id }) => {
  const [problemDescription, setProblemDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const editorRef = useRef(null);
  const [submissionResult, setSubmissionResult] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Disable spell-checking for the entire component
    document.body.spellcheck = false;

    // Re-enable spell-checking when component unmounts
    return () => {
      document.body.spellcheck = true;
    };
  }, []);

  useEffect(() => {
    if (!id) return; // Ensure the id is available

    const fetchProblemDescription = async () => {
      try {
        console.log(id);
        console.log(`${process.env.NEXT_PUBLIC_API_URL}`);
        console.log(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-problem-description/${id}`
        );
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-problem-description/${id}`
        );
        console.log(response);
        const htmlContent = await response.text(); // Fetch HTML as text
        setProblemDescription(htmlContent); // Set the fetched HTML content
      } catch (error) {
        console.error("Error fetching problem description:", error);
      }
    };

    fetchProblemDescription();
  }, [id]); // Re-fetch when the ID changes

  const handleRun = async () => {
    if (!id) {
      setOutput("Error: Problem ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/run`,
        {
          language,
          code,
          input,
        }
      );
      console.log(response.data);
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput(
        "Error: " +
          (error.response?.data?.error || "An unexpected error occurred")
      );
    }
  };

  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-4">Problem Description</h1>
    //   {/* Rendering the fetched HTML */}
    //   <div
    //     dangerouslySetInnerHTML={{ __html: problemDescription }}
    //     className="problem-description"
    //   />
    // </div>

    <div className="flex h-screen bg-gray-100 w-screen">
        <h1 className="text-2xl font-bold mb-4">Problem Description</h1>
      {/* Problem View (Left Side) */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <div dangerouslySetInnerHTML={{ __html: problemDescription }}
        className="problem-description"/>
      </div>

      {/* Compiler (Right Side) */}
      <div className="w-1/2 p-6 bg-gray-800 text-white">
        <h3 className="text-white font-bold mb-4">Compile Genie</h3>
        <div className="mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
            <option value="c">C</option>
          </select>
        </div>
        <div
          className="bg-gray-900 text-white shadow-md w-full mb-4 rounded-md"
          style={{ height: "30vh", overflowY: "auto", overflowX: "auto" }}
          ref={editorRef}
        >
          <Editor
            value={code}
            placeholder="Write your code here"
            onValueChange={(code) => setCode(code)}
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

        {/* Input textarea */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Custom Input:</h3>
          <textarea
            value={input}
            placeholder="Enter your input.."
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-1/6 p-4 bg-gray-700 text-white font-mono rounded"
            spellCheck="false" // This line disables browser spell-checking
            autoCorrect="off" // This line disables autocorrect on mobile devices
            autoCapitalize="off" // This line disables auto-capitalization
            data-gramm="false" // Disables Grammarly
            data-gramm_editor="false" // Also disables Grammarly
            data-enable-grammarly="false" // Disables Grammarly
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleRun}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Run Code
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Output:</h3>
          <textarea
            value={output}
            readOnly // read-only since it's just for displaying output
            className="w-full h-1/6 p-4 bg-gray-700 text-white font-mono rounded"
          />
        </div>
      </div>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const { id } = context.params;

  // Pass data to the page via props
  return { props: { id } };
}

export default ProblemDetails;
