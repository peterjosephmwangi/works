"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { getProjects } from "../../actions/getProjects";
import { addProject, NewProject } from "../../actions/addProject";
import { databases } from "../../lib/appwrite";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const databaseId = "67add1b5003d443b3ae6";
const collectionId = "67bcb2220032243e25e1";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [technologies, setTechnologies] = useState([]);
  const [form, setForm] = useState<NewProject>({
    title: "",
    description: "",
    techStack: [],
    imageUrl: "",
    repoUrl: "",
    liveUrl: "",
    category: "",
  });

  // Fetch available technologies
  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const response = await databases.listDocuments(databaseId, collectionId);
        const techOptions = response.documents.map((tech) => ({
          value: tech.name,
          label: tech.name,
        }));
        setTechnologies(techOptions);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    }
    fetchTechnologies();
  }, []);

  // Fetch projects
  useEffect(() => {
    async function fetchData() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTechStackChange = (selectedOptions) => {
    setForm({ ...form, techStack: selectedOptions.map((option) => option.value) });
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProject(form);
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
      setForm({ title: "", description: "", imageUrl: "", repoUrl: "", liveUrl: "", category: "", techStack: [] });
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {/* Project Form */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Add a New Project</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProject} className="space-y-4">
            <Input type="text" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} required />
            <Textarea name="description" placeholder="Project Description" value={form.description} onChange={handleChange} required />
            <Input type="text" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
            <Input type="text" name="repoUrl" placeholder="GitHub Repo URL" value={form.repoUrl} onChange={handleChange} />
            <Input type="text" name="liveUrl" placeholder="Live Project URL" value={form.liveUrl} onChange={handleChange} />
            <Input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
            
            {/* React-Select for Tech Stack */}
            <Select
              isMulti
              name="techStack"
              options={technologies}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Technologies"
              value={technologies.filter((tech) => form.techStack.includes(tech.value))}
              onChange={handleTechStackChange}
            />

            <Button type="submit" className="w-full">Add Project</Button>
          </form>
        </CardContent>
      </Card>

      {/* Project List */}
      {/* {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.$id}>
              <CardHeader>
                <h2 className="text-xl font-semibold">{project.title}</h2>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
                <p className="text-sm text-gray-500">Category: {project.category}</p>
                <p>Tech Stack: {project.techStack.join(", ")}</p>
              </CardContent>
              <CardFooter>
                <a href={project.repoUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  GitHub Repo
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )} */}
    </div>
  );
}
