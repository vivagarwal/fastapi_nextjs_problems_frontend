'use client';
import { useState, useEffect } from 'react'

export default function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('Fetching from:', process.env.NEXT_PUBLIC_API_URL);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    <div>
      <h2>Data from Backend:</h2>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  )
}
