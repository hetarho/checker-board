import { db } from "@/shared/api";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export function HomePage() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "test"));
      if (querySnapshot.docs.length > 0) {
        setTitle(querySnapshot.docs[0].data().title);
      }
    } catch (e) {
      console.error("read data error: ", e);
    }
  }

  return <div>{title}</div>;
}
