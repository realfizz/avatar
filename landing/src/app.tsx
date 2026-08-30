import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block";

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
            <CodeBlock>
              <CodeBlockCode
                code="GET https://avatar-api.fizz.blog/fizz"
                language="bash"
              />
            </CodeBlock>
          </div>
          <div className="space-y-6">
            <h2 className="font-[450]">Size</h2>
            <CodeBlock>
              <CodeBlockCode
                code="GET https://avatar-api.fizz.blog/fizz?size=64"
                language="bash"
              />
            </CodeBlock>
          </div>
          <div className="space-y-6">
            <h2 className="font-[450]">Rounded</h2>
            <CodeBlock>
              <CodeBlockCode
                code="GET https://avatar-api.fizz.blog/fizz?rounded=60"
                language="bash"
              />
            </CodeBlock>
          </div>
          <div className="space-y-6">
            <h2 className="font-[450]">Format</h2>
            <CodeBlock>
              <CodeBlockCode
                code="GET https://avatar-api.fizz.blog/fizz?format=svg"
                language="bash"
              />
            </CodeBlock>
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
