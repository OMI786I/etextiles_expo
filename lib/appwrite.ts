import { Client, Account, ID, Databases, Query } from "react-native-appwrite";

const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  Platform: "com.omi.jamar_dokan",
  databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  collectionID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
};

const client = new Client();
client
  .setEndpoint(config.endPoint!)
  .setProject(config.projectId!)
  .setPlatform(config.Platform!);

const database = new Databases(client);

export async function fetchDocuments() {
  try {
    const result = await database.listDocuments(
      config.databaseID, // databaseId
      config.collectionID // collectionId
      //  [Query.equal("type", ["female"])]
    );
    return result.documents;
  } catch (error) {
    console.error(error);
  }
}
