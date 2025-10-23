/* eslint-disable prettier/prettier */

import { Account, Avatars, Client, Databases, ID, Query, TablesDB } from 'react-native-appwrite';
import { CreateUserParams, SignInParams } from 'type';

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: 'com.kzn.foodordering',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
  databaseId: '68f5fe4d00223185e6fe',
  userCollectionId: 'user',
};

export const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint!)
  .setProject(appWriteConfig.projectId!)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);
export const createUser = async ({ email, name, password }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;
    await signIn({ email, password });
    const accountid = newAccount.$id;
    if (!accountid) throw new Error('accountId is not provided');

    console.log(newAccount.$id, 'ini akun id');

    //genereate an avarar image using user initial
    const avatarUrl = avatars.getInitialsURL(name);
    return await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      { accountid: accountid, email, name, password, avatar: avatarUrl },
    );
  } catch (error) {
    throw new Error(error as string);
  }
};
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (err: unknown) {
    throw new Error(`error happened while signing: ${String(err)}`);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal('accountid', currentAccount.$id)],
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
