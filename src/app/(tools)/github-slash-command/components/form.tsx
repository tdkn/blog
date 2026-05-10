"use client";
import { useEffect, useRef, useState } from "react";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "~/components/ui/input-group";

import { CheckBox } from "../components/checkbox";

export const Form = () => {
  const repoInputRef = useRef<HTMLInputElement>(null);
  const [repo, setRepo] = useState("owner/repo");
  const [features, setFeatures] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleFeatureChange = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature],
    );
  };

  const copyCommand = async () => {
    const command = repo.length === 0 ? "" : `/github subscribe ${repo} ${features.join(" ")}`;

    try {
      await navigator.clipboard.writeText(command);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  useEffect(() => {
    if (repoInputRef.current) {
      repoInputRef.current.focus();
    }
  }, []);

  const command = repo.length === 0 ? "" : `/github subscribe ${repo} ${features.join(" ")}`;
  const commandPlaceholder = `/github subscribe owner/repo ${features.length > 0 ? features.join(" ") : "[feature]"}`;
  const copyButtonText = {
    copied: "Copied",
    failed: "Failed",
    idle: "Copy",
  }[copyStatus];

  return (
    <Card className="mx-auto mt-10 max-w-2xl border-border/70 shadow-sm">
      <CardContent>
        <form className="flex flex-col gap-8">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="repository">Repository</FieldLabel>
              <Input
                className="h-10 bg-background"
                id="repository"
                onChange={(e) => {
                  setRepo(e.target.value);
                }}
                placeholder="owner/repo"
                ref={repoInputRef}
                required={true}
                type="text"
                value={repo}
              />
              <FieldDescription>Use the GitHub owner/repository format.</FieldDescription>
            </Field>
          </FieldGroup>

          <FieldSet>
            <FieldLegend>Features</FieldLegend>
            <FieldGroup data-slot="checkbox-group">
              <CheckBox
                description="Opened or closed issues"
                name="issues"
                onChange={() => {
                  handleFeatureChange("issues");
                }}
              />
              <CheckBox
                description='New or merged pull requests, as well as draft pull requests marked "Ready for Review"'
                name="pulls"
                onChange={() => {
                  handleFeatureChange("pulls");
                }}
              />
              <CheckBox
                description="New commits across all branches"
                name="commits:*"
                onChange={() => {
                  handleFeatureChange("commits:*");
                }}
              />
              <CheckBox
                description="Published releases"
                name="releases"
                onChange={() => {
                  handleFeatureChange("releases");
                }}
              />
              <CheckBox
                description="Deployment status updates"
                name="deployments"
                onChange={() => {
                  handleFeatureChange("deployments");
                }}
              />
              <CheckBox
                description="Actions workflow run notifications"
                name="workflows"
                onChange={() => {
                  handleFeatureChange(
                    `workflows:{name:"your workflow name" event:"workflow event" branch:"branch name" actor:"actor name"}`,
                  );
                }}
              />
              <CheckBox
                description="Pull request reviews"
                name="reviews"
                onChange={() => {
                  handleFeatureChange("reviews");
                }}
              />
              <CheckBox
                description="New comments on issues and pull requests"
                name="comments"
                onChange={() => {
                  handleFeatureChange("comments");
                }}
              />
              <CheckBox
                description="Created or deleted branches"
                name="branches"
                onChange={() => {
                  handleFeatureChange("branches");
                }}
              />
              <CheckBox
                description="Filter issues, pull-requests and comments based on their labels"
                name="label"
                onChange={() => {
                  handleFeatureChange(`+label:"your label"`);
                }}
              />
              <CheckBox
                description="Discussions created or answered"
                name="discussions"
                onChange={() => {
                  handleFeatureChange("discussions");
                }}
              />
            </FieldGroup>
          </FieldSet>

          <Field>
            <FieldLabel htmlFor="command-output">Generated Slash Command</FieldLabel>
            <InputGroup className="bg-muted/60">
              <InputGroupTextarea
                className="font-mono"
                id="command-output"
                placeholder={commandPlaceholder}
                readOnly={true}
                value={command}
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  aria-label="Copy generated command"
                  className="w-20 ml-auto bg-primary text-primary-foreground hover:bg-primary/85"
                  onClick={() => {
                    void copyCommand();
                  }}
                  variant="default"
                >
                  {copyStatus === "copied" ? (
                    <CheckIcon data-icon="inline-start" />
                  ) : (
                    <CopyIcon data-icon="inline-start" />
                  )}
                  {copyButtonText}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
