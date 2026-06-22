import { strategicProjects } from "@/data/ecrtSite";
import { projects } from "@/data/projects";

export function getAllProjectSlugs(): string[] {
  const strategic = strategicProjects.map((p) => p.slug);
  const regular = projects.map((p) => p.slug);
  return [...new Set([...strategic, ...regular])];
}
