import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./constants";

export default function Redirect() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.REDIRECT(slug || ""));
        if (response.status === 404) {
          navigate("/not-found");
          return;
        }

        // If we get here, the URL exists, so redirect to it
        window.location.href = API_ENDPOINTS.REDIRECT(slug || "");
      } catch (error) {
        console.error("Error during redirection:", error);
        navigate("/not-found");
      }
    };

    checkAndRedirect();
  }, [slug, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Redirecting...
        </h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
