import { Client, Account, ID, Databases, Query } from "react-native-appwrite";

type Data = {
  title: string;
  price: number;
  description: string;
  rating: number;
  size: string[];
  seller: string;
  image: string;
  type: string;
  buyer: string;
};

const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  Platform: "com.omi.jamar_dokan",
  databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  collectionID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
  wishlistCollectionID: process.env.EXPO_PUBLIC_APPWRITE_WISHCOLLECTION_ID,
  cartCollectionID: process.env.EXPO_PUBLIC_APPWRITE_CARTCOLLECTION_ID,
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

export async function wishlistCreateDocument(data: Data) {
  try {
    const result = await database.createDocument(
      config.databaseID, // databaseId
      config.wishlistCollectionID, // collectionId
      ID.unique(), // documentId
      data // data
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function CartCreateDocument(data: Data) {
  try {
    const result = await database.createDocument(
      config.databaseID, // databaseId
      config.cartCollectionID, // collectionId
      ID.unique(), // documentId
      data // data
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchWishlist() {
  try {
    let result = await database.listDocuments(
      config.databaseID,
      config.wishlistCollectionID
    );

    return result.documents;
  } catch (error) {
    console.error(error);
  }
}
