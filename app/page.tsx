"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProjects } from "./actions/getProjects";
import Link from "next/link";
import { getTechnologies } from "./actions/getTechnologies";

const techFilters = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Express.js",
  "TypeScript",
  "JavaScript",
  "GraphQL",
  "MongoDB",
  "Firebase",
];

export interface Technology {
  $id: string;
  name: string;
  iconKey: string;
}
const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [project, setProject] = useState<Technology[]>([]);
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      const techs = await getTechnologies();
      setTechnologies(techs);
      setProject(techs);
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();

        const formattedProjects = data.map((project) => {
          let techStack = [];
          try {
            techStack =
              typeof project.techStack === "string"
                ? JSON.parse(project.techStack)
                : project.techStack;
            if (!Array.isArray(techStack)) {
              techStack = [];
            }
          } catch (error) {
            console.error("Error parsing techStack:", project.techStack, error);
            techStack = [];
          }

          return { ...project, techStack };
        });

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(search.toLowerCase())
      ) &&
      (selectedTechIds.length === 0 ||
        selectedTechIds.every((tech) => project.techStack.includes(tech)))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 rounded-lg">
        <h1 className="text-xl font-bold mb-2 md:mb-0">My Portfolio</h1>
        <input
          type="text"
          placeholder="Search technologies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-auto rounded bg-gray-700 border border-gray-600"
        />
      </nav>

      <div className="mt-4 container mx-auto">
        <label className="text-gray-400 mr-2">Filter by Technology:</label>
        <Select
          isMulti
          options={technologies.map((tech) => ({ label: tech.name, value: tech.name }))}
          className="w-full md:w-1/2"
          onChange={(selectedOptions) =>
            setSelectedTechIds(selectedOptions.map((option) => option.value))
          }
        />
      </div>

      <div className="container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden border border-gray-700 shadow-lg">
                <div className="relative">
                  <img
                    src={project?.imageUrl}
                    alt={project.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="flex gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={project.moreLink} target="_blank">
                            <Button variant="ghost" className="text-white">
                              <Eye className="w-6 h-6" />
                            </Button>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>View More</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={project.liveLink} target="_blank">
                            <Button variant="ghost" className="text-white">
                              <ExternalLink className="w-6 h-6" />
                            </Button>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>View Live</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">{project?.title}</h2>
                  <p className="text-sm text-gray-400">{project.category}</p>
                  <div className="mt-2 text-sm text-gray-900">
                    <strong>Tech Stack:</strong> {project.techStack.join(", ")}
                  </div>
                  <div className="flex justify-between mt-4">
                    <Link href={`/projects/${project.$id}`}>
                      <Button variant="outline">View More</Button>
                    </Link>
                    <a href={project.liveLink} target="_blank">
                      <Button variant="default">View Live</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;


// "use client";
// import React, { useEffect, useState } from "react";
// import Select from "react-select";

// import { motion } from "framer-motion";
// import {
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
// } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Eye, ExternalLink } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { getProjects } from "./actions/getProjects";
// import Link from "next/link";
// import { getTechnologies } from "./actions/getTechnologies";

// const techFilters = [
//   "React",
//   "Next.js",
//   "Vue",
//   "Angular",
//   "Node.js",
//   "Express.js",
//   "TypeScript",
//   "JavaScript",
//   "GraphQL",
//   "MongoDB",
//   "Firebase",
// ];

// export interface Technology {
//   $id: string;
//   name: string;
//   iconKey: string;
// }
// const Home = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedTech, setSelectedTech] = useState("");
//   const [project, setProject] = useState<Technology[]>([]);
// const [selectedTechIds, setSelectedTechIds] = useState([]);

// const [technologies, setTechnologies] = useState<Technology[]>([]);

// useEffect(() => {
//   const fetchTechnologies = async () => {
//     const techs = await getTechnologies();
//     setTechnologies(techs);
//     setProject(techs)
//   };

//   fetchTechnologies();
// }, []);



//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getProjects();

//         const formattedProjects = data.map((project) => {
//           let techStack = [];
//           try {
//             techStack =
//               typeof project.techStack === "string"
//                 ? JSON.parse(project.techStack)
//                 : project.techStack;
//             // Ensure it's an array
//             if (!Array.isArray(techStack)) {
//               techStack = [];
//             }
//           } catch (error) {
//             console.error("Error parsing techStack:", project.techStack, error);
//             techStack = [];
//           }

//           return { ...project, techStack };
//         });

//         setProjects(formattedProjects);
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const toggleTech = (tech) => {
//     setSelectedTech((prev) =>
//       prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
//     );
//   };

//   const uniqueTechnologies = [
//     ...new Set(projects.flatMap((project) => project.techStack || [])),
//   ];

//   const filteredProjects = projects.filter(
//     (project) =>
//       project.techStack.some((tech) =>
//         tech.toLowerCase().includes(search.toLowerCase())
//       ) && (selectedTech ? project.techStack.includes(selectedTech) : true)
//   );
  

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       {/* Navbar */}
//       <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 rounded-lg">
//         <h1 className="text-xl font-bold mb-2 md:mb-0">My Portfolio</h1>
//         <input
//           type="text"
//           placeholder="Search technologies..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 w-full md:w-auto rounded bg-gray-700 border border-gray-600"
//         />
//       </nav>

//       {/* Filter Bar */}
//       <div className="mt-4 container mx-auto">
//         <label className="text-gray-400 mr-2">Filter by Technology:</label>
//         <select
//           value={selectedTech}
//           onChange={(e) => setSelectedTech(e.target.value)}
//           className="px-4 py-2 rounded bg-gray-700 border border-gray-600"
//         >
//           <option value="">All</option>
//           {uniqueTechnologies.map((tech) => (
//             <option key={tech} value={tech}>
//               {tech}
//             </option>
//           ))}
//         </select>
//         </div>
//            {/* filter two  */}
      
  
//       {/* Projects Grid */}
//       <div className="container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProjects.length > 0 ? (
//           filteredProjects.map((project, index) => (
//             <motion.div
//               key={index}
//               className="relative group"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <Card className="overflow-hidden border border-gray-700 shadow-lg">
//                 {/* Project Image */}
//                 <div className="relative">
//                   <img
//                     src={project?.imageUrl}
//                     alt={project.name}
//                     className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
//                     <div className="flex gap-4">
//                       {/* View More Icon */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <a href={project.moreLink} target="_blank">
//                             <Button variant="ghost" className="text-white">
//                               <Eye className="w-6 h-6" />
//                             </Button>
//                           </a>
//                         </TooltipTrigger>
//                         <TooltipContent>View More</TooltipContent>
//                       </Tooltip>

//                       {/* View Live Icon */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <a href={project.liveLink} target="_blank">
//                             <Button variant="ghost" className="text-white">
//                               <ExternalLink className="w-6 h-6" />
//                             </Button>
//                           </a>
//                         </TooltipTrigger>
//                         <TooltipContent>View Live</TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Project Info */}
//                 <CardContent className="p-4">
//                   <h2 className="text-lg font-semibold">{project?.title}</h2>
//                   <p className="text-sm text-gray-400">{project.category}</p>
//                   {/* <p className="text-sm text-gray-400">{project?.tech?.join(", ")}</p> */}
//                   <div className="mt-2 text-sm text-gray-900">
//                     <strong>Tech Stack:</strong> {project.techStack.join(", ")}
//                   </div>

//                   {/* Always Visible Buttons */}
//                   <div className="flex justify-between mt-4">
//                     <Link href={`/projects/${project.$id}`}>
//                       <Button variant="outline">View More</Button>
//                     </Link>
//                     <a href={project.liveLink} target="_blank">
//                       <Button variant="default">View Live</Button>
//                     </a>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-400 col-span-full text-center">
//             No projects found.
//           </p>
//         )}
//       </div>
//     </div>
  
//   )
// };

// export default Home;
// "use client"
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// //  import { motion } from "framer-motion";
//  import { Tooltip } from "@/components/ui/tooltip";
//  import { TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
//  import { Button } from "@/components/ui/button";
//  import { Eye, ExternalLink } from "lucide-react";
//  import { Card, CardContent } from "@/components/ui/card";

// const Home = () => {
//   const [search, setSearch] = useState("");
//   const [selectedTech, setSelectedTech] = useState("");

//   const projects = [
//     {
//       id: 1,
//       name: "Portfolio Website",
//       tech: ["Next.js", "Tailwind CSS"],
//       image: "/images/image.jpeg", // Example image
//       liveLink: "#",
//       moreLink: "#",
//     },
//     {
//       id: 2,
//       name: "E-commerce Store",
//       tech: ["React", "Redux"],
//       image: "/images/image1.jpeg",
//       liveLink: "#",
//       moreLink: "#",
//     },
//     {
//       id: 3,
//       name: "Chat App",
//       tech: ["Firebase", "Next.js"],
//       image: "/images/image.png",
//       liveLink: "#",
//       moreLink: "#",
//     },
//     {
//       id: 4,
//       name: "Portfolio Website",
//       tech: ["Next.js", "Tailwind CSS"],
//       image: "/images/image.jpeg", // Example image
//       liveLink: "#",
//       moreLink: "#",
//     },
//     {
//       id: 5,
//       name: "E-commerce Store",
//       tech: ["React", "Redux"],
//       image: "/images/image1.jpeg",
//       liveLink: "#",
//       moreLink: "#",
//     },
//     {
//       id: 6,
//       name: "Chat App",
//       tech: ["Firebase", "Next.js"],
//       image: "/images/image.png",
//       liveLink: "#",
//       moreLink: "#",
//     },
//   ];

//   const uniqueTechnologies = [...new Set(projects.flatMap((project) => project.tech))];

//   const filteredProjects = projects.filter(
//     (project) =>
//       project.tech.some((tech) => tech.toLowerCase().includes(search.toLowerCase())) &&
//       (selectedTech ? project.tech.includes(selectedTech) : true)
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       {/* Navbar */}
//       <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 rounded-lg">
//         <h1 className="text-xl font-bold mb-2 md:mb-0">My Portfolio</h1>
//         <input
//           type="text"
//           placeholder="Search technologies..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 w-full md:w-auto rounded bg-gray-700 border border-gray-600"
//         />
//       </nav>

//       {/* Filter Bar */}
//       <div className="mt-4">
//         <label className="text-gray-400 mr-2">Filter by Technology:</label>
//         <select
//           value={selectedTech}
//           onChange={(e) => setSelectedTech(e.target.value)}
//           className="px-4 py-2 rounded bg-gray-700 border border-gray-600"
//         >
//           <option value="">All</option>
//           {uniqueTechnologies.map((tech) => (
//             <option key={tech} value={tech}>
//               {tech}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Projects Grid */}

//        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//          {filteredProjects.length > 0 ? (
//            filteredProjects.map((project, index) => (
//              <motion.div
//                key={project.id}
//                className="relative group"
//                initial={{ opacity: 0, y: 50 }}
//                animate={{ opacity: 1, y: 0 }}
//                transition={{ duration: 0.5, delay: index * 0.2 }}
//              >
//                <Card className="overflow-hidden border border-gray-700 shadow-lg">
//                  {/* Project Image */}
//                  <div className="relative">
//                    <img
//                      src={project.image}
//                      alt={project.name}
//                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
//                    />

//                    {/* Hover Overlay */}
//                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
//                      <div className="flex gap-4">
//                        {/* View More Icon */}
//                        <Tooltip>
//                          <TooltipTrigger asChild>
//                            <a href={project.moreLink} target="_blank">
//                              <Button variant="ghost" className="text-white">
//                                <Eye className="w-6 h-6" />
//                              </Button>
//                            </a>
//                          </TooltipTrigger>
//                          <TooltipContent>View More</TooltipContent>
//                        </Tooltip>

//                        {/* View Live Icon */}
//                        <Tooltip>
//                          <TooltipTrigger asChild>
//                            <a href={project.liveLink} target="_blank">
//                              <Button variant="ghost" className="text-white">
//                                <ExternalLink className="w-6 h-6" />
//                              </Button>
//                            </a>
//                          </TooltipTrigger>
//                          <TooltipContent>View Live</TooltipContent>
//                        </Tooltip>
//                      </div>
//                    </div>
//                  </div>

//                  {/* Project Info */}
//                  <CardContent className="p-4">
//                    <h2 className="text-lg font-semibold">{project.name}</h2>
//                    <p className="text-sm text-gray-400">{project.tech.join(", ")}</p>

//                    {/* Always Visible Buttons */}
//                    <div className="flex justify-between mt-4">
//                      <a href={project.moreLink} target="_blank">
//                        <Button variant="outline">View More</Button>
//                      </a>
//                      <a href={project.liveLink} target="_blank">
//                        <Button variant="default">View Live</Button>
//                      </a>
//                    </div>
//                  </CardContent>
//                </Card>
//              </motion.div>
//            ))
//          ) : (
//            <p className="text-gray-400 col-span-full text-center">No projects found.</p>
//          )}
//        </div>
//     </div>
//   );
// };

// export default Home;
