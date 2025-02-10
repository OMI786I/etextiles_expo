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
export const account = new Account(client);
export async function fetchDocuments(selectedType: string) {
  try {
    let result;

    // If selectedType is "All", don't apply any filter
    if (selectedType === "All") {
      result = await database.listDocuments(
        config.databaseID,
        config.collectionID
      );
    } else {
      // Apply filter if selectedType is not "All"
      result = await database.listDocuments(
        config.databaseID, // databaseId
        config.collectionID, // collectionId
        [Query.equal("type", [selectedType])]
      );
    }

    return result.documents;
  } catch (error) {
    console.error(error);
  }
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDocumentsById(docsId: string) {
  try {
    const result = await database.getDocument(
      config.databaseID, // databaseId
      config.collectionID, // collectionId
      docsId // documentId
      //[]  queries (optional)
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}
