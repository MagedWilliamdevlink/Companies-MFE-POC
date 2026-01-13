"use client";

import { useEffect } from "react";

export default function SingleSpaProvider() {
  useEffect(() => {
    import("../single-spa/root-config").then(({ startSingleSpa }) => {
      startSingleSpa();
    });
  }, []);

  return null;
}
