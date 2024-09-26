'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-all-problems`);
        const data = await response.json();
        setProblems(data.problems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Problems List</h1>
      
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.length > 0 ? (
            problems.map((problem) => (
              <tr key={problem.id} className="text-center border-b">
                <td className="py-2">{problem.id}</td>
                <td className="py-2">{problem.name}</td>
                <td className="py-2">
                  {/* Create link to dynamic problem description page */}
                  <Link href={`/problems/${problem.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4">No problems found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
