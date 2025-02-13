"use client";
import { useEffect, useState } from "react";
import { getProjects } from "../../actions/getProjects";
import { addProject, NewProject } from "../../actions/addProject";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<NewProject>({
    title: "",
    description: "",
    techStack: [],
    imageUrl: "",
    repoUrl: "",
    liveUrl: "",
    category: "",
  });

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

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, techStack: e.target.value.split(",").map((tech) => tech.trim()) });
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProject(form);
      const updatedProjects = await getProjects(); // Refresh projects
      setProjects(updatedProjects);
      setForm({ title: "", description: "", techStack: [], imageUrl: "", repoUrl: "", liveUrl: "", category: "" }); // Reset form
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Project Form */}
      <form onSubmit={handleAddProject} className="mb-6 p-4 border rounded bg-gray-100">
        <input type="text" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} className="block w-full p-2 mb-2 border" required />
        <textarea name="description" placeholder="Project Description" value={form.description} onChange={handleChange} className="block w-full p-2 mb-2 border" required />
        <input type="text" name="techStack" placeholder="Tech Stack (comma separated)" value={form.techStack.join(", ")} onChange={handleTechStackChange} className="block w-full p-2 mb-2 border" required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="block w-full p-2 mb-2 border" />
        <input type="text" name="repoUrl" placeholder="GitHub Repo URL" value={form.repoUrl} onChange={handleChange} className="block w-full p-2 mb-2 border" />
        <input type="text" name="liveUrl" placeholder="Live Project URL" value={form.liveUrl} onChange={handleChange} className="block w-full p-2 mb-2 border" />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="block w-full p-2 mb-2 border" required />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded w-full">Add Project</button>
      </form>

      {/* Project List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.$id} className="p-4 border border-gray-300 my-2 rounded">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500">Category: {project.category}</p>
              <p>Tech Stack: {project.techStack.join(", ")}</p>
              <a href={project.repoUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
