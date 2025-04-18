import classNames from "classnames";
import { useEffect, useState } from "react";
import { Typography } from "../Typography/Typography";
import { Icon } from "../Icon/Icon";
import { formatSize } from "./formatSize";
import { Button } from "../Button/Button";
import { ButtonBar } from "../ButtonBar/ButtonBar";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import "./FileInput.css";
import { CommonProps } from "../../common/commonProps";

export interface FileInputProps extends CommonProps<HTMLInputElement> {
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  onAction?: (files: File[]) => Promise<void>;
  action?: string;
  label?: string;
}

export function FileInput(
  { 
    ref, 
    id = 'file-upload', 
    label = 'Click to select files, or drop here', 
    multiple = false, 
    accept = '*', onAction, 
    disabled, 
    action = "Upload",
    className,
    ...props
   }: FileInputProps
) {
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

  const interactive = !(disabled || processing);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        "FileInput",
        disabled && "FileInput--disabled",
        interactive && "FileInput--interactive",
        dragActive && "FileInput--dragactive",
        className,
      )}
    >
      {<label htmlFor={id}>
        <Typography.Label>{label}</Typography.Label>
      </label>}
      <input
        ref={ref}
        accept={accept}
        className="hidden"
        disabled={!interactive}
        id={id}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        type="file"
        {...props}
      />
      {selectedFiles.length > 0 && (
        <div className="FileInput__files">
          <div className="FileInput__filelist">
            <Scrollbar className="FileInput__scrollbar">
              <ul>
                {selectedFiles.map(file => (
                  <li
                    key={file.name}
                    title={file.name}
                    className="FileInput__file"
                  >
                    {file.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                      />
                    )}
                    <span className="FileInput__label">
                      <Typography.Label>{file.name}</Typography.Label>
                    </span>
                    <span>
                      <Typography.Label>{formatSize(file.size)}</Typography.Label>
                    </span>
                    <Icon
                      hidden={!interactive}
                      type="CrossCircled"
                      height={3}
                      className="FileInput__icon"
                      onClick={() => onDelete(file.name)}
                    />
                  </li>
                ))}
              </ul>
            </Scrollbar>
          </div>
          {selectedFiles.length ? (
            <ButtonBar full>
              <Button
                variant="silent"
                onClick={onClear}
                disabled={!interactive}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                onClick={onClick}
                disabled={!interactive}
                loading={processing}
              >
                {action} ({selectedFiles.length})
              </Button>
            </ButtonBar>
          ) : null}
        </div>
      )}
    </div>
  );
};

