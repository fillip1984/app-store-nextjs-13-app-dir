import { prisma } from "@/prisma/globalPrismaClient";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const token = process.env.GIT_HUB_TOKEN;

interface Repository {
  name: string;
  description: string | null;
  url: string;
  visibility?: string;
  readme: string;
  language: string | null;
  languages?: Language[];
}

interface Language {
  language: string;
  linesOfCode: number;
}

export async function GET() {
  console.log("Loading apps from github");
  const octokit = new Octokit({ auth: token });
  // See: https://docs.github.com/en/rest/reference
  // Also see: https://octokit.github.io/rest.js/v19#usage

  const repos = await octokit.rest.repos.listForAuthenticatedUser();

  const repositories: Repository[] = await Promise.all(
    repos.data.map(async (repo) => {
      const { name, description, html_url, visibility, language, owner } = repo;
      let readme = "";
      let languages: Language[] = [];

      // TODO: get and render markdown (separate to own function)
      try {
        const readmeRaw = await octokit.rest.repos.getReadme({
          owner: owner.login,
          repo: name,
        });

        const renderedMarkdown = await octokit.rest.markdown.render({
          text: Buffer.from(readmeRaw.data.content, "base64").toString(),
        });

        readme = renderedMarkdown.data;
      } catch (error) {
        console.error("repo: " + name + " did not have a readme");
      }

      // TODO: get and map languages (separate to own function)
      try {
        const languagesKeyValuePairs = await octokit.rest.repos.listLanguages({
          owner: owner.login,
          repo: name,
        });
        languages = Object.entries(languagesKeyValuePairs.data).map(
          (languagesKeyValuePair) => {
            return {
              language: languagesKeyValuePair[0],
              linesOfCode: languagesKeyValuePair[1] || 0,
            };
          }
        );
      } catch (error) {
        console.error(
          "repo: " + name + " had an error while figuring out languages"
        );
      }

      const newRepo: Repository = {
        name,
        description,
        url: html_url,
        visibility,
        readme,
        language,
        languages,
      };
      return newRepo;
    })
  );

  try {
    repositories.forEach(async (repo) => {
      const newApp = await prisma.application.create({
        data: {
          name: repo.name,
          description: repo.description,
          repositoryUrl: repo.url,
        },
      });
    });
  } catch (error) {
    console.error("Error while committing repo to db", error);
  }

  console.log("Loaded %s apps from github", repositories.length);
  return NextResponse.json(repositories);
}
