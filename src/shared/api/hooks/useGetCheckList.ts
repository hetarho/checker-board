import { doc, getDoc } from "firebase/firestore";
import { db } from "../db";
import type { CheckList } from "../types/check-list.type";
import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS } from "../constant/collections";

const getCheckList = async (id: string) => {
  const docRef = doc(db, COLLECTIONS.CHECK_LIST, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as CheckList;
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