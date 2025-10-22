import { collection, getDocs } from "firebase/firestore";
import { db } from "../db";
import type { CheckList } from "../types/check-list.type";
import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS } from "../../lib/firebase/constant/collections";

const listAllCheckLists = async () => {
  const docRef = collection(db, COLLECTIONS.CHECK_LIST);
  const docSnap = await getDocs(docRef);    

  if (docSnap.docs.length > 0) {
    return docSnap.docs.map((doc) => doc.data() as CheckList);
  } else {
    throw new Error(`CheckList not found`);
  }
};

export const useListAllCheckLists = () => {
  return useQuery({
    queryKey: ["checkList"],
    queryFn: () => listAllCheckLists(),
  });
};