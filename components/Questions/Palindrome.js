'use client';
export default function Palindrome() {
    return (
    <div>
        <p>
          Given an integer <code className="bg-gray-100 p-1 rounded">x</code>, return <code className="bg-gray-100 p-1 rounded">true</code> if <code className="bg-gray-100 p-1 rounded">x</code> is a palindrome, and <code className="bg-gray-100 p-1 rounded">false</code> otherwise.
        </p>

        {/* Problem examples */}
        <div className="my-4">
          <p><strong>Example 1:</strong></p>
          <pre className="bg-gray-100 p-2 rounded"><strong>Input:</strong> 121\n<strong>Output:</strong> true</pre>

          <p><strong>Example 2:</strong></p>
          <pre className="bg-gray-100 p-2 rounded"><strong>Input:</strong> -121\n<strong>Output:</strong> false</pre>

          <p><strong>Example 3:</strong></p>
          <pre className="bg-gray-100 p-2 rounded"><strong>Input:</strong> 10\n<strong>Output:</strong> false</pre>
        </div>

        <h2><strong>Input</strong></h2>
        <p>The first line of the input contains a single integer for which palindrome needs to be checked</p>

        <h2><strong>Output</strong></h2>
        <p>Output true if it is palindrome else output false</p>
    </div>
    
    )
}
