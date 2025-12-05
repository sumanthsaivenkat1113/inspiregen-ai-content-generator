// hooks/useBlogData.js
import { useEffect, useState } from "react";
import buildEditableData from "../utils/buildEditableData";

export function useBlogData(navBlogData, navBlogTemplate, templatesConfig) {
  const storedBlogData = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("blogData") || "null");
    } catch {
      return null;
    }
  })();

  const storedBlogTemplate = sessionStorage.getItem("blogTemplate") || "template1";

  const incomingData = navBlogData || storedBlogData;
  const incomingTemplate = navBlogTemplate || storedBlogTemplate;

  const [selectedTemplate, setSelectedTemplate] = useState(incomingTemplate);
  const [activeElement, setActiveElement] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!incomingData) return;

    if (incomingData?.contentJson) {
      setData(buildEditableData(incomingData.contentJson, incomingData.headerImage));
    } else if (incomingData.styles) {
      setData(incomingData);
    } else {
      setData(buildEditableData(incomingData, incomingData.headerImage));
    }
  }, [navBlogData]);

  useEffect(() => {
    const available = templatesConfig.blog || ["template1"];
    if (!available.includes(selectedTemplate)) {
      setSelectedTemplate(available[0]);
    }
  }, [selectedTemplate]);

  return {
    data,
    setData,
    activeElement,
    setActiveElement,
    selectedTemplate,
    setSelectedTemplate,
  };
}
