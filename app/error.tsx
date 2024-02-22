"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>
        You need to configure your environment variables, check the Readme.md
        file.
      </p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
