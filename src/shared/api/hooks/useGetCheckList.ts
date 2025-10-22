import { doc, getDoc, QueryDocumentSnapshot, type FirestoreDataConverter, type SnapshotOptions } from "firebase/firestore";
import { db } from "../db";
import type { CheckList } from "../types/check-list.type";
import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS } from "../../lib/firebase/constant/collections";

const getCheckList = async (id: string): Promise<CheckList> => {
  const docRef = doc(db, COLLECTIONS.CHECK_LIST, id).withConverter(checkListConverter);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error(`CheckList with id ${id} not found`);
  }
};

export const useGetCheckList = (id: string) => {
  return useQuery({
    queryKey: ["checkList", id],
    queryFn: () => getCheckList(id),
  });
};

export const checkListConverter: FirestoreDataConverter<CheckList> = {
  toFirestore: (checkList: CheckList) => {
    return {
      id: checkList.id,
      title: checkList.title,
      description: checkList.description,
      createdAt: checkList.createdAt,
      updatedAt: checkList.updatedAt,
      items: checkList.items,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions
  ): CheckList => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      items: data.items,
    };
  },
};
