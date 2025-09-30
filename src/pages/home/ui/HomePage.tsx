import { useListAllCheckLists } from "@/shared/api";
import { useEffect } from "react";

export function HomePage() {
  const { data: checkLists } = useListAllCheckLists();

  useEffect(() => {
    console.log(checkLists);
  }, [checkLists]);

  return <div>{checkLists?.map((checkList) => checkList.title)}</div>;
}
