import { databases } from "../lib/appwrite";

const databaseId = "67add1b5003d443b3ae6"; // Your database ID
const collectionId = "67adf54d003077926db7"; // Your collection ID

export interface NewProject {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  repoUrl: string;
  liveUrl: string;
  category: string;
}

export const addProject = async (project: NewProject) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      "unique()", // Auto-generate document ID
      {
        title: project.title,
        description: project.description,
        techStack: JSON.stringify(project.techStack), // Store as JSON string
        imageUrl: project.imageUrl,
        repoUrl: project.repoUrl,
        liveUrl: project.liveUrl,
        category: project.category,
      }
    );

    console.log("Project added successfully:", response);
    return response;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
