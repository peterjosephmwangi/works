// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getProjects } from "@/app/actions/getProjects";
// import { Button } from "@/components/ui/button";

// // Import tech stack icons
// import { FaReact, FaJs, FaCode, FaDatabase, FaMobile } from "react-icons/fa";
// import { SiNextdotjs, SiTailwindcss, SiMongodb, SiNodedotjs } from "react-icons/si";

// // Tech stack mapping with icons
// const techIcons: { [key: string]: JSX.Element } = {
//   "React Native": <FaReact className="text-blue-400" />,
//   "JavaScript": <FaJs className="text-yellow-400" />,
//   "API Integration": <FaCode className="text-green-400" />,
//   "Next.js": <SiNextdotjs className="text-white" />,
//   "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
//   "MongoDB": <SiMongodb className="text-green-500" />,
//   "Node.js": <SiNodedotjs className="text-green-500" />,
//   "Mobile Development": <FaMobile className="text-purple-400" />,
//   "Database": <FaDatabase className="text-gray-400" />,
// };

// const ProjectPage = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProject() {
//       try {
//         const data = await getProjects();
//         const foundProject = data.find((p) => p.$id === id);
//         setProject(foundProject || null);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProject();
//   }, [id]);

//   if (loading) return <p className="text-center text-white">Loading project...</p>;
//   if (!project) return <p className="text-center text-white">Project not found</p>;

//   return (
//     <div className="bg-gray-900 min-h-screen">
//       <h1 className="text-3xl text-center text-white font-bold py-6">{project.title}</h1>
//     <div className="  text-white flex justify-center items-center p-4">
//       <div className="container mx-auto max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">

//         <div className="flex flex-col md:flex-row">
//           {/* Left Side - Image */}
//           <div className="md:w-1/2 w-full h-[400px]">
//             <img
//               src={project.imageUrl}
//               alt={project.title}
//               className="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
//             />
//           </div>

//           {/* Right Side - Project Info */}
//           <div className="md:w-1/2 w-full p-6 flex flex-col justify-start">
//             {/* <h1 className="text-3xl font-bold">{project.title}</h1> */}
//             <p className="text-gray-400 text-sm mt-1">{project.category}</p>
//             <p className="mt-3 text-gray-300">{project.description}</p>

//             {/* Tech Stack with Icons */}
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold text-gray-300">Tech Stack:</h3>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {project.techStack.map((tech, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
//                   >
//                     {techIcons[tech] || <FaCode />} {/* Fallback icon */}
//                     {tech}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex gap-4">
//               <Button asChild variant="outline">
//                 <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
//                   View Live
//                 </a>
//               </Button>
//               <Button asChild variant="outline">
//                 <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
//                   GitHub Repo
//                 </a>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>

//   );
// };

// export default ProjectPage;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjects } from "@/app/actions/getProjects";
import { Button } from "@/components/ui/button";

// Import icons
import {
  FaReact,
  FaJs,
  FaCode,
  FaDatabase,
  FaMobile,
  FaCheckCircle,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiNodedotjs,
} from "react-icons/si";

// Tech stack mapping with icons
const techIcons: { [key: string]: JSX.Element } = {
  "React Native": <FaReact className="text-blue-400" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  "API Integration": <FaCode className="text-green-400" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  "Node.js": <SiNodedotjs className="text-green-500" />,
  "Mobile Development": <FaMobile className="text-purple-400" />,
  Database: <FaDatabase className="text-gray-400" />,
};

const features = [
  "Real-time weather updates",
  "Dark mode support",
  "Offline functionality",
  "Multiple city search",
  "Push notifications",
  "User authentication",
  "AI-powered recommendations",
  "Multi-language support",
];

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjects();
        const foundProject = data.find((p) => p.$id === id);
        setProject(foundProject || null);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading)
    return <p className="text-center text-white">Loading project...</p>;
  if (!project)
    return <p className="text-center text-white">Project not found</p>;

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="text-3xl text-center text-white font-bold py-6">
        {project.title}
      </h1>
      <div className="text-white flex justify-center items-center p-4">
        <div className="container mx-auto max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Image */}
            <div className="md:w-1/2 w-full h-[400px]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
              />
            </div>

            {/* Right Side - Project Info */}
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-start">
              <p className="text-gray-400 text-sm mt-1">{project.category}</p>
              <p className="mt-3 text-gray-300">{project.description}</p>

              {/* Tech Stack with Icons */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-300">
                  Tech Stack:
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
                    >
                      {techIcons[tech] || <FaCode />} {/* Fallback icon */}
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <Button asChild variant="outline">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repo
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* 🔥 Features & Functionalities Section 🔥 */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Features & Functionalities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features?.length > 0 ? (
                features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-700 p-4 rounded-lg shadow-sm"
                  >
                    <FaCheckCircle className="text-green-400 text-lg" />
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  No features listed for this project.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
