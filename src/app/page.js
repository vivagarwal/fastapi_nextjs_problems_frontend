'use client';
import DataFetcher from "../../components/DataFetcher"
import Problems from "../../components/Problem";
export default function Home() {
  return (
    <div>
      <h1>Welcome to my Full-Stack App</h1>
      <DataFetcher />
      <Problems/>
    </div>
  )
}