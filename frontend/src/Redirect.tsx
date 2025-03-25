import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./constants";

export default function Redirect() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToUrl = async () => {
      try {
        // Make a request to the backend
        const response = await fetch(API_ENDPOINTS.REDIRECT(slug || ""));

        if (response.status === 404) {
          navigate("/not-found");
          return;
        }

        // Get the redirect URL from the response
        const location = response.headers.get("location");
        if (location) {
          // Redirect to the original URL
          window.location.href = location;
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error during redirection:", error);
        navigate("/not-found");
      }
    };

    redirectToUrl();
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
