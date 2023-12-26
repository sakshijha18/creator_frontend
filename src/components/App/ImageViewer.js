import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ImageViewer() {
  const { id, attachment } = useParams();
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/mails/${id}/${attachment}`
        );
        const data = await response.json();

        setImageData(data);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();
  }, [id, attachment]);

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link
        to={`/records/mails/${id}`}
        className="bg-gray-800 text-white py-1 px-4 rounded-full inline-block mt-5 mb-4"
      >
        Back
      </Link>
      <div>
        {/* Use Blob to create a URL for the Binary data */}
        <img
          src={URL.createObjectURL(new Blob([imageData.data.data], { type: imageData.contentType }))}
          alt={imageData.fileName}
        />
      </div>
    </div>
  );
}

export default ImageViewer;
