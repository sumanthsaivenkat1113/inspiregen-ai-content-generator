import InspireGen from "../components/InspireGen/InspireGen";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const handleGenerate = (topic, type, posterCategory,  provider) => {
    navigate("/generate/content", {
      state: { topic, type, posterCategory,  provider },
      replace: false,
    });
  };

  return <InspireGen onGenerate={handleGenerate} />;
}
