import mongoose from "mongoose";

export type DummyDocument<T> = T & { _id: mongoose.Schema.Types.ObjectId };
export type DummyCollection<T> = DummyDocument<T>[];

export const createDocument = <T>(doc: T): DummyDocument<T> => ({
  ...doc,
  _id: new mongoose.Schema.Types.ObjectId(
    new mongoose.Types.ObjectId().toString()
  ),
});

export const createCollection = <T>(docs: T[]): DummyCollection<T> =>
  docs.map(createDocument);

export const fakeResponse = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
