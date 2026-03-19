import { Editor } from "./Editor";

interface DocumentPageProps {
  params: {
    documentId: Promise<string>;
  };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#fafbfd] w-full flex justify-center">
      <Editor />
    </div>
  );
};
export default DocumentPage;
