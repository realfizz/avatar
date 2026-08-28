import { useState } from "react";

function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const space = children.indexOf(" ");
  const cmd = space === -1 ? children : children.slice(0, space);
  const rest = space === -1 ? "" : children.slice(space);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <pre className="group relative m-0 overflow-x-auto rounded-[6px] bg-[#FCFCFC] p-4 text-[13px] shadow-2xs outline-1 outline-neutral-950/10">
      <button
        type="button"
        aria-label={copied ? "Copied" : "Copy"}
        className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-[6px] text-neutral-500 opacity-0 transition duration-150 ease-out group-hover:opacity-100 hover:text-neutral-900"
        onClick={copy}
      >
        {copied ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 14L8.5 17.5L19 6.5" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" />
            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" />
          </svg>
        )}
      </button>
      <code className="whitespace-pre">
        <span className="text-neutral-900">{cmd}</span>
        <span className="text-neutral-500">{rest}</span>
      </code>
    </pre>
  );
}

export function App() {
  return (
    <div className="min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col space-y-14 px-6 py-20">
        <div className="space-y-6">
          <h1 className="font-medium">Avatar</h1>
          <p className="text-neutral-500">Same seed, same face.</p>
        </div>
        <div className="space-y-14">
          <div className="space-y-6">
            <h2 className="font-[450]">Usage</h2>
            <Code>GET /fizz</Code>
          </div>
          <div className="space-y-6">
            <h2 className="font-[450]">Size</h2>
            <Code>GET /fizz?size=64</Code>
          </div>
          <div className="space-y-6">
            <h2 className="font-[450]">Rounded</h2>
            <Code>GET /fizz?rounded=60</Code>
          </div>
          <div className="space-y-6">
            <h2 className="font-[450]">Format</h2>
            <Code>GET /fizz?format=svg</Code>
          </div>
        </div>
      </main>
      <footer className="flex w-full items-center justify-center px-4 pt-24 pb-6 text-center text-sm font-medium text-neutral-400 sm:px-0">
        <span>
          ©{new Date().getFullYear()}{" "}
          <a
            href="https://fizz.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900"
          >
            Fizz
          </a>
        </span>
      </footer>
    </div>
  );
}
