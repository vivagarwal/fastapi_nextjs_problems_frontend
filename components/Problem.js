'use-client';
import Link from 'next/link';

export default function Problems() {

    return (
    <Link href="/problems/palindrome-number" className="no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-pointer whitespace-normal hover:!text-[inherit]">
    Palindrome Number
    </Link>
    )
}