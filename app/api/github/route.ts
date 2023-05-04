import { prisma } from "@/prisma/globalPrismaClient";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const token = process.env.GIT_HUB_TOKEN;

interface Repository {
  name: string;
  url: string;
  visibility?: string;
  readme: string;
  language: string;
  languages?: Language[];
}

interface Language {
  language: string;
  linesOfCode: number;
}

export const GET = async () => {
  const octokit = new Octokit({ auth: token });
  // See: https://docs.github.com/en/rest/reference
  // Also see: https://octokit.github.io/rest.js/v19#usage

  const repos = await octokit.rest.repos.listForAuthenticatedUser();

  const repositories = await Promise.all(
    repos.data.map(async (repo) => {
      const { language, name, owner, html_url, visibility } = repo;
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
        console.log("repo: " + name + " did not have a readme");
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
        console.log(
          "repo: " + name + " had an error while figuring out languages"
        );
      }

      return {
        name,
        url: html_url,
        visibility,
        readme,
        language,
        languages,
      };
    })
  );

  try {
    repositories.forEach(async (repo) => {
      const newApp = await prisma.application.create({
        data: {
          name: repo.name,
          description: repo.readme,
          repositoryUrl: repo.url,
        },
      });
      console.log("created app: " + newApp.name);
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(repositories);
};