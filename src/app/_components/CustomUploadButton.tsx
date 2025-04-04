"use client";

import { useState, useCallback, useEffect } from "react";
import { useUploadThing } from "~/utils/uploadthing";
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface CustomUploadButtonProps {
  onUploadComplete?: (urls: string[]) => void;
  className?: string;
  autoReset?: boolean;
  resetDelay?: number;
  showResetButton?: boolean;
  endpoint?: "imageUploader";
}

export default function CustomUploadButton({
  onUploadComplete,
  className = "",
  autoReset = true,
  resetDelay = 2000,
  showResetButton = false,
  endpoint = "imageUploader"
}: CustomUploadButtonProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);
  
  // 重置函數
  const resetUploader = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
  }, []);
  
  // 清除現有計時器並設置新的計時器
  const handleAutoReset = useCallback((delay: number) => {
    if (resetTimer) {
      clearTimeout(resetTimer);
    }
    
    if (autoReset) {
      const timer = setTimeout(resetUploader, delay);
      setResetTimer(timer);
    }
  }, [autoReset, resetTimer, resetUploader]);
  
  // 使用 useUploadThing hook
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onUploadBegin(){
        toast("Uploading....",{
            icon: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
            duration: 3000,
            className: "bg-background border-border border text-foreground",})
    },
    onClientUploadComplete: (res) => {
      setStatus("success");
      const urls = res?.map((r) => r.url) || [];
      onUploadComplete?.(urls);
      handleAutoReset(resetDelay);
    },
    onUploadError: (error) => {
      setStatus("error");
      setErrorMessage(error.message || "上傳失敗");
      handleAutoReset(resetDelay + 1000);
    },
  });
  // 從 routeConfig 獲取允許的檔案類型
  // eslint-disable-next-line 
const fileTypes = ["jpg", "png", "gif"]; // 手動設定允許的檔案類型
const maxFileSize = 4; // 手動設定最大檔案大小

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (resetTimer) {
      clearTimeout(resetTimer);
      setResetTimer(null);
    }
    
    setStatus("uploading");
    void startUpload(Array.from(files));
    
    // 清空輸入欄位，允許重新選擇相同檔案
    e.target.value = "";
  };

  // 組件卸載時清除計時器
  useEffect(() => {
    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [resetTimer]);

  // 檔案大小資訊
  const fileSizeInfo = fileTypes.length > 0 && maxFileSize 
    ? `最大檔案大小: ${Math.round(Number(maxFileSize) / 1024 / 1024)}MB` 
    : '';

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="relative flex-1">
            <input
              type="file"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50 disabled:cursor-not-allowed"
              accept={fileTypes.map(type => `.${type}`).join(',')}
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
            />
            
            {status === "uploading" && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 size={18} className="animate-spin text-blue-500" />
              </div>
            )}
            
            {status === "success" && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CheckCircle2 size={18} className="text-green-500" />
              </div>
            )}
            
            {status === "error" && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <AlertCircle size={18} className="text-red-500" />
              </div>
            )}
          </label>
          
          {showResetButton && status !== "idle" && !isUploading && (
            <button 
              className="bg-gray-200 text-gray-500 py-2 px-3 rounded disabled:opacity-50"
              onClick={resetUploader}
              title="重置上傳器"
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>
        
        {/* 狀態訊息 */}
        {status === "uploading" && (
          <p className="text-xs text-blue-500">上傳中...</p>
        )}
        
        {status === "success" && (
          <p className="text-xs text-green-500">上傳成功!</p>
        )}
        
        {status === "error" && (
          <p className="text-xs text-red-500">{errorMessage || "上傳失敗"}</p>
        )}
        
        {/* 檔案類型和大小資訊 */}
        <p className="text-xs text-muted-foreground">
          允許的檔案類型: {fileTypes.join(', ')} 
          {fileSizeInfo && <> | {fileSizeInfo}</>}
        </p>
      </div>
    </div>
  );
} 