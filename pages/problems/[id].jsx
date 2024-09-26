import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import SubmissionPage from '@/app/submission/page';

const ProblemDescriptionPage = ({ id }) => {
  const [problemDescription, setProblemDescription] = useState('');
  // const router = useRouter();
  // const { id } = router.query; // Get the ID from the dynamic route

  useEffect(() => {
    if (!id) return; // Ensure the id is available

    const fetchProblemDescription = async () => {
      try {
        console.log(id);
        console.log(`${process.env.NEXT_PUBLIC_API_URL}`);
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/get-problem-description/${id}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-problem-description/${id}`);
        console.log(response);
        const htmlContent = await response.text(); // Fetch HTML as text
        setProblemDescription(htmlContent); // Set the fetched HTML content
      } catch (error) {
        console.error('Error fetching problem description:', error);
      }
    };

    fetchProblemDescription();
  }, [id]); // Re-fetch when the ID changes

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Problem Description</h1>
      {/* Rendering the fetched HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: problemDescription }}
        className="problem-description"
      />
      <SubmissionPage id={id}/>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const { id } = context.params;
  
  // Pass data to the page via props
  return { props: { id } };
}

export default ProblemDescriptionPage;
