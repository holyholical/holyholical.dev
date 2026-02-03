"use client";

import React, { useEffect, useState } from "react";
import { SimpleLoader } from "@/components/ui/Loader";

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const username = "holyholical";
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`,
        );
        const data = await res.json();
        const mapped: Project[] = data.map((repo: GitHubRepo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
        }));
        setProjects(mapped);
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Projects...</h1>
        <SimpleLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-300 mb-3">
              {project.description || "No description"}
            </p>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
