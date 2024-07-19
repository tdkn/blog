"use client";
import { useEffect, useRef, useState } from "react";

import "~/styles/globals.css";

import { CheckBox } from "../components/checkbox";

export function Form() {
  const repoInputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const [repo, setRepo] = useState("owner/repo");
  const [features, setFeatures] = useState<string[]>([]);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleFeatureChange = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  useEffect(() => {
    if (repoInputRef.current) {
      repoInputRef.current.focus();
    }
  }, []);

  return (
    <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-x-4 gap-y-10">
      {/* Input: owner/repo */}
      <input
        autoFocus={true}
        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
        onChange={(e) => setRepo(e.target.value)}
        placeholder="owner/repo"
        ref={repoInputRef}
        required={true}
        type="text"
        value={repo}
      />

      {/* Input: features */}
      <fieldset className="space-y-1">
        <CheckBox
          description="Opened or closed issues"
          name="issues"
          onChange={() => handleFeatureChange("issues")}
        />
        <CheckBox
          description={
            'New or merged pull requests, as well as draft pull requests marked "Ready for Review"'
          }
          name="pulls"
          onChange={() => handleFeatureChange("pulls")}
        />
        <CheckBox
          description="New commits across all branches"
          name="commits:*"
          onChange={() => handleFeatureChange("commits:*")}
        />
        <CheckBox
          description="Published releases"
          name="releases"
          onChange={() => handleFeatureChange("releases")}
        />
        <CheckBox
          description="Deployment status updates"
          name="deployments"
          onChange={() => handleFeatureChange("deployments")}
        />
        <CheckBox
          description="Actions workflow run notifications"
          name="workflows"
          onChange={() =>
            handleFeatureChange(
              `workflows:{name:"your workflow name" event:"workflow event" branch:"branch name" actor:"actor name"}`,
            )
          }
        />
        <CheckBox
          description="Pull request reviews"
          name="reviews"
          onChange={() => handleFeatureChange("reviews")}
        />
        <CheckBox
          description="New comments on issues and pull requests"
          name="comments"
          onChange={() => handleFeatureChange("comments")}
        />
        <CheckBox
          description="Created or deleted branches"
          name="branches"
          onChange={() => handleFeatureChange("branches")}
        />
        <CheckBox
          description="Filter issues, pull-requests and comments based on their labels"
          name="label"
          onChange={() => handleFeatureChange(`+label:"your label"`)}
        />
        <CheckBox
          description="Discussions created or answered"
          name="discussions"
          onChange={() => handleFeatureChange("discussions")}
        />
      </fieldset>

      {/* Output: command */}
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={`/github subscribe owner/repo ${features.length > 0 ? features.join(" ") : "[feature]"}`}
            readOnly={true}
            ref={outputRef}
            type="text"
            value={
              repo ? `/github subscribe ${repo} ${features.join(" ")}` : ""
            }
          />
        </div>
        <button
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => {
            if (outputRef.current) {
              const command = outputRef.current.value;
              navigator.clipboard
                .writeText(command)
                .then(() => {
                  setCopyButtonText("Copied!");
                  setTimeout(() => setCopyButtonText("Copy"), 2000);
                })
                .catch(() => {
                  alert("Failed to copy the command.");
                });
            }
          }}
          type="button"
        >
          {copyButtonText}
        </button>
      </div>
    </form>
  );
}
