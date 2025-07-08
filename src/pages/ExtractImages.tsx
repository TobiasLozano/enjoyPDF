import {
  Typography,
  type UploadProps,
  message,
  Upload,
  Button,
  Alert,
  type UploadFile,
  Divider,
} from "antd";
import {
  DownloadOutlined,
  InboxOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const { Title } = Typography;

function ExtractImages() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  const { Dragger } = Upload;
  const zip = new JSZip();

  const [loading, setLoading] = useState(false);
  const [showAlert, seShowAlert] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<unknown>[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const props: UploadProps = {
    name: "file",
    accept: ".pdf",
    defaultFileList: [],
    
  maxCount: 1,
    style: { height: "100px" },
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file);
        setFileList([info.file]);
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
  const handleExtract = async () => {
    setLoading(true);
    if (fileList.length === 0) {
      setLoading(false);
      return seShowAlert(true);
    }
    await renderPage();
    setLoading(false);
  };

  const renderPage = async () => {
    setLoading(true);
    setImages([]);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    console.log(fileList);
    console.log(fileList[0]);
    const file = fileList[0];
    const url = URL.createObjectURL(file.originFileObj!);

    const pdf = await pdfjsLib.getDocument(url).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvasContext = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const render_context = { canvasContext, viewport };
      await page.render(render_context).promise;
      const image = canvas.toDataURL("image/png");
      setImages((prev) => [...prev, image]);
    }
  };

  const downloadImage = (url: string, index: number) => {
    saveAs(url, `${fileList[0].name.split(".")[0]}-page-${index + 1}`);
  };
  async function handleZip() {
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      console.log(blob);
      zip.file(`${fileList[0].name.split(".")[0]}-page-${i + 1}.png`, blob);
    }

    const zipData = await zip.generateAsync({
      type: "blob",
      streamFiles: true,
    });
    console.log(zipData);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(zipData);
    link.download = `${fileList[0].name.split(".")[0]}.zip`;
    link.click();
  }

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        seShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  return (
    <div>
      <Title level={4} style={{ textAlign: "center" }}>
        Extract images from PDF
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
            You will get a .zip file with your images extracted from the PDF.
          </p>
        </Dragger>
        <Button
          type="primary"
          loading={loading && { icon: <SyncOutlined spin /> }}
          ghost
          onClick={() => handleExtract()}
          style={{ display: "block", margin: "0 auto", marginTop: "20px" }}
        >
          {!loading && "Extract images"}
        </Button>
        {showAlert && (
          <Alert
            message="You need to upload your file"
            type="warning"
            style={{ margin: "10px auto", textAlign: "center" }}
          />
        )}
        {images.length > 0 &&
        <div>
          <Divider/>

               <div style={{ textAlign: "center", margin: "10px auto" }}>

        <Button type="primary" onClick={() => handleZip()}>
          Download ZIP
        </Button>
        </div>
           {images.map((image, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                margin: "20px 0",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div style={{ textAlign: "right", marginBottom: "10px" }}>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => downloadImage(image, index)}
                />
              </div>
              <img
                src={image}
                alt={`Extracted page ${index + 1}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          ))}  
      </div>}
    </div>
    </div>
  );
}

export default ExtractImages;
