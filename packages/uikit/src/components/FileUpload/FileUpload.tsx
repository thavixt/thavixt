import classNames from "classnames";
import { useEffect, useState } from "react";
import { Typography } from "../Typography/Typography";
import { Icon } from "../Icon/Icon";
import { formatSize } from "./formatSize";
import { Button } from "../Button/Button";
import { ButtonBar } from "../ButtonBar/ButtonBar";
import { Scrollbar } from "../Scrollbar/Scrollbar";

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  onAction?: (files: File[]) => Promise<void>;
  action?: string;
}

export function FileUpload({ multiple = false, accept, onAction, disabled, action = "Upload" }: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setSelectedFiles(prev => prev.length ? [prev[0]] : []);
  }, [multiple]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (disabled || !selectedFiles) {
      return;
    }

    const files = Array.from(selectedFiles);
    if (!files.length) {
      setSelectedFiles([]);
      return;
    }

    if (multiple) {
      setSelectedFiles(prev => Array.from(
        [
          ...prev,
          ...files.filter(file => !prev.map(p => p.name).includes(file.name)),
        ]
      ));
    } else {
      setSelectedFiles([files[0]]);
    }
  };

  const onClick = async () => {
    if (!onAction || !selectedFiles.length) {
      return;
    }
    setProcessing(true);
    try {
      await onAction(selectedFiles);
    } finally {
      setProcessing(false);
      setSelectedFiles([]);
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    if (disabled) {
      return;
    }
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    if (disabled) {
      return;
    }
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    if (disabled) {
      return;
    }
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const onDelete = (fileName: string) => {
    if (disabled) {
      return;
    }
    setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
  }

  const onClear = () => setSelectedFiles([]);

  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";
  const interactive = !(disabled || processing);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        cursorClass,
        "themedBackground themedBorder border-dashed",
        "rounded-xl p-4 flex flex-col items-center justify-center text-center",
        "transition duration-200 ease-in-out min-w-[300px]",
        {
          "!border-transparent disabled opacity-50": disabled,
          "pointer-events-none": !interactive,
          "drop-shadow-md": !dragActive,
          "drop-shadow-xl": dragActive,
        },
      )}
    >
      {(multiple || !selectedFiles.length) ? (
        <label htmlFor="file-upload">
          <Typography.Label className={cursorClass}>
            Click to browse or drop files here
          </Typography.Label>
        </label>
      ) : null}
      <input
        accept={accept}
        className="hidden"
        disabled={!interactive}
        id="file-upload"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        type="file"
      />
      {selectedFiles.length > 0 && (
        <div className="w-full flex flex-col space-y-2">
          <Typography.Caption className="text-sm text-gray-600 font-semibold">
            Selected files:{selectedFiles.length ? ` (${selectedFiles.length})` : ''}
          </Typography.Caption>
          <div className="max-h-[500px]">
            <Scrollbar className="h-full w-full max-h-100 p-1">
              <ul className="space-y-2">
                {selectedFiles.map(file => (
                  <li
                    key={file.name}
                    title={file.name}
                    className={classNames(
                      "flex items-center justify-between shadow-sm p-2 rounded-md",
                      "bg-slate-100 dark:bg-slate-700",
                      "hover:bg-slate-200 hover:dark:bg-slate-600",
                    )}
                  >
                    {file.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    )}
                    <span className="flex-1 ml-2 truncate px-2">
                      <Typography.Label>{file.name}</Typography.Label>
                    </span>
                    <span>
                      <Typography.Label>{formatSize(file.size)}</Typography.Label>
                    </span>
                    <Icon
                      hidden={!interactive}
                      icon="CrossCircled"
                      height={3}
                      className={classNames('ml-2 hover:opacity-50', cursorClass)}
                      onClick={() => onDelete(file.name)}
                    />
                  </li>
                ))}
              </ul>
            </Scrollbar>
          </div>
          {selectedFiles.length ? (
            <ButtonBar full>
              <Button variant="silent" onClick={onClear} disabled={!interactive}>
                Clear
              </Button>
              <Button variant="primary" onClick={onClick} disabled={!interactive} loading={processing}>
                {action}
              </Button>
            </ButtonBar>
          ) : null}
        </div>
      )}
    </div>
  );
};

