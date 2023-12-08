import Navbar from "/components/navbar";
import ImageUpload from "/components/imageupload";

export default function Upload() {
  return (
    <div className="h-screen flex-col">
      <div className="bg-white w-full top-0 z-50">
        <Navbar />
      </div>
      <ImageUpload />
    </div>
  );
}
