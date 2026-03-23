import { Editor } from "./Editor";
import NavBar from "./NavBar";
import ToolBar from "./ToolBar";

interface DocumentPageProps {
  params: {
    documentId: Promise<string>;
  };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#fafbfd] w-full flex items-center flex-col">
      <div className="flex flex-col px-4 pt-.5 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
        <NavBar />
        <ToolBar />
      </div>
      <div className="pt-32 print:pt-0">
        <Editor />
      </div>
    </div>
  );
};
export default DocumentPage;
