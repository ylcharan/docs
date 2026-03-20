import { Editor } from "./Editor";
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
      <ToolBar />
      <Editor />
    </div>
  );
};
export default DocumentPage;
