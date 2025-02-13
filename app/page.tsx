"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const projects = [
    { id: 1, name: "Portfolio Website", tech: ["Next.js", "Tailwind CSS"] },
    { id: 2, name: "E-commerce Store", tech: ["React", "Redux"] },
    { id: 3, name: "Chat App", tech: ["Firebase", "Next.js"] },
  ];

  const uniqueTechnologies = [...new Set(projects.flatMap((project) => project.tech))];

  const filteredProjects = projects.filter(
    (project) =>
      project.tech.some((tech) => tech.toLowerCase().includes(search.toLowerCase())) &&
      (selectedTech ? project.tech.includes(selectedTech) : true)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 rounded-lg">
        <h1 className="text-xl font-bold mb-2 md:mb-0">My Portfolio</h1>
        <input
          type="text"
          placeholder="Search technologies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-auto rounded bg-gray-700 border border-gray-600"
        />
      </nav>

      {/* Filter Bar */}
      <div className="mt-4">
        <label className="text-gray-400 mr-2">Filter by Technology:</label>
        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600"
        >
          <option value="">All</option>
          {uniqueTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm text-gray-400">{project.tech.join(", ")}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
