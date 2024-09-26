'use client';
import React, { useState } from 'react';
import Palindrome from '../../../../components/Questions/Palindrome';
import ProblemDescriptionPage from '../../../../components/ProblemDescriptionPage';

const PalindromeNumberPage = () => {
  const [input, setInput] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null); // Updated to store the result
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(submitting);
    setSubmitting(true);
    console.log(submitting);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-palindrome`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inp: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setSubmissionResult({
        input: jsonData.input,
        output: jsonData.output,
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmissionResult({
        input,
        output: 'An unexpected error occurred during submission.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Palindrome Number Problem</h1>
      <div>
        {/*<Palindrome/>*/}
        <ProblemDescriptionPage/>
        {/* Input form */}
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter a number to check if it's a palindrome"
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Display input/output after submission */}
      {submissionResult && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Input:</h3>
            <p className="border p-2 rounded">{submissionResult.input}</p>
          </div>
          <div>
            <h3 className="font-bold">Output:</h3>
            <p className="border p-2 rounded">{submissionResult.output ? 'true' : 'false'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PalindromeNumberPage;
