import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Use your Appwrite endpoint if self-hosted
  .setProject("67add129002a020e15d6"); // Your Project ID

const databases = new Databases(client);

export { client, databases };
