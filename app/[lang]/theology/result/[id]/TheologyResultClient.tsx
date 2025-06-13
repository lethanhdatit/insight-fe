"use client";
import { useEffect, useState } from "react";
import AncientResultDisplay from "@/components/ancient-result-display";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useRouter } from "next/navigation";
import { apiCall } from "@/helpers/apiHelper";

export default function TheologyResultClient({
  lang,
  id,
  dictionary,
}: {
  lang: string;
  id: string | undefined;
  dictionary: any;
}) {
  const [result, setResult] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.replace(`/${lang}`);
      return;
    }
    setLoading(true);
    apiCall(`/api/theology?id=${id}`, "GET", null, true)
      .then(async (res) => {
        if (res.error) throw new Error();
        setResult(res);
      })
      .catch(() => {
        router.replace(`/${lang}`);
      })
      .finally(() => setLoading(false));
  }, [id, lang, router]);

  if (loading) return <LoadingOverlay />;
  if (!result) return null;

  return <AncientResultDisplay result={result} dictionary={dictionary} />;
}