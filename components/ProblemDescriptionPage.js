import React, { useEffect, useState } from 'react';

const ProblemDescriptionPage = () => {
  const [problemDescription, setProblemDescription] = useState('');

  useEffect(() => {
    const fetchProblemDescription = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-problem-description`);
        const htmlContent = await response.text(); // Fetch HTML as text
        setProblemDescription(htmlContent); // Set the fetched HTML content
      } catch (error) {
        console.error('Error fetching problem description:', error);
      }
    };

    fetchProblemDescription();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Problem Description</h1>
      {/* Rendering the fetched HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: problemDescription }}
        className="problem-description"
      />
    </div>
  );
};

export default ProblemDescriptionPage;
