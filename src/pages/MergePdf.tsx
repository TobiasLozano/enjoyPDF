import {
  Typography,
  type UploadProps,
  message,
  Upload,
  Button,
  Alert,
  type UploadFile,
} from "antd";
import { InboxOutlined, SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PDFMerger from "pdf-merger-js/browser";
const { Dragger } = Upload;
const { Title } = Typography;

function MergePdf() {
  const [loading, setLoading] = useState(false);
  const [showAlert, seShowAlert] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<unknown>[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | undefined>();
  const props: UploadProps = {
    name: "file",
    accept: ".pdf",
    style: { height: "100px" },
    multiple: true,

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setFileList(info.fileList);
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const onMerge = async () => {
    if (fileList.length === 0) {
      return seShowAlert(true);
    }
    setLoading(true);
    console.log("Lista de stado");
    console.log(fileList);
    const merger = new PDFMerger();

    for (const file of fileList) {
      await merger.add(file.originFileObj as Blob);
    }
    await merger.setMetadata({
      producer: "Enjoy PDF",
    });

    const mergedPdf = await merger.saveAsBlob();
    const url = URL.createObjectURL(mergedPdf);
    setLoading(false);

    return setMergedPdfUrl(url);
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        seShowAlert(false);
      },3000);
    }
  }, [showAlert]);

  return (
    <div>
      <Title level={4} style={{ textAlign: "center" }}>
        Merge PDF files
      </Title>
      <div style={{ width: "90%", maxWidth: "600px", margin: "0 auto" }}>
        <Dragger
          {...props}
          style={{ margin: "50px auto 0 auto" }}
          className="pdf-dragger"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text" style={{ height: "25px" }}>
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Your files will be organized in the order you uploaded them.
          </p>
        </Dragger>
        <Button
          type="primary"
          loading={loading && { icon: <SyncOutlined spin /> }}
          ghost
          onClick={() => onMerge()}
          style={{ display: "block", margin: "0 auto", marginTop: "20px" }}
        >
          {!loading && "Merge files"}
        </Button>
        {showAlert && (
          
          <Alert message="You need to upload your files" type="warning" style={{margin:'10px auto', textAlign:"center"}} />
        )}
        {mergedPdfUrl && (
          <>
            <Title level={5} style={{ textAlign: "center", marginTop: "20px" }}>
              Merged PDF file
            </Title>
            <iframe
              height={1000}
              src={`${mergedPdfUrl}`}
              title="pdf-viewer"
              width="100%s"
            ></iframe>
          </>
        )}
      </div>
    </div>
  );
}

export default MergePdf;
