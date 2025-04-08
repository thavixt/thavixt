import classNames from "classnames";
import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Dialog } from "../Dialog/Dialog";
import "./ImageViewer.css";
import { Divider } from "../Divider/Divider";
import { Button } from "../Button/Button";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { Typography } from "../Typography/Typography";

interface Image {
  src: string;
  description?: string;
}

interface ImageViewerProps extends Omit<CommonProps<HTMLImageElement>, 'src'> {
  src: (Image | string)[];
  sidebar?: (index: number) => ReactNode;
  title?: string;
  width?: number;
  height?: number;
}

export function ImageViewer({ className, src, sidebar, title, width = 300, height = 300, ...imageProps }: ImageViewerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const srcList = useMemo(() => Array.isArray(src) ? src : [src], [src]);
  const currentImage = srcList[index];
  const currentImageSrc = typeof currentImage === "string" ? currentImage : currentImage.src;
  const currentImageDesc = `(${index + 1}/${src.length}) ${typeof currentImage === "string" ? '' : currentImage.description}`;

  const onClick = () => setDialogOpen(true);
  const onNext = () => setIndex(prev => Math.min(prev + 1, srcList.length - 1));
  const onPrev = () => setIndex(prev => Math.max(prev - 1, 0));

  return (
    <div
      className={classNames('ImageViewer', className)}
      style={{ backgroundImage: `url("${currentImageSrc}")` }}
      onClick={onClick}
    >
      {dialogOpen ? (
        <Dialog
          closeIcon
          closeOnClickOutside
          onClose={() => setDialogOpen(false)}
          open
          title={title}
        >
          <div className="ImageViewer__container">
            <Image isDialog={dialogOpen} {...imageProps} source={currentImageSrc} description={currentImageDesc}>
              <ImageControls
                next={onNext}
                nextDisabled={index >= srcList.length - 1}
                prev={onPrev}
                prevDisabled={index <= 0}
              />
            </Image>
            {sidebar ? <Divider vertical /> : null}
            <Scrollbar className="ImageViewer__sidebar">
              {sidebar?.(index)}
            </Scrollbar>
          </div>
        </Dialog>
      ) : null
      }
      <div className="ImageViewer__filter"></div>
      <div className="ImageViewer__container" style={{ width, height }}>
        <Image {...imageProps} isDialog={dialogOpen} source={currentImageSrc} description={currentImageDesc}>
          <ImageControls
            next={() => setIndex(prev => Math.min(prev + 1, srcList.length - 1))}
            nextDisabled={index >= srcList.length - 1}
            prev={() => setIndex(prev => Math.max(prev - 1, 0))}
            prevDisabled={index <= 0}
          />
        </Image>
      </div>
    </div >
  )
}

interface ImageControlsProps {
  prev: () => void;
  prevDisabled: boolean;
  next: () => void;
  nextDisabled: boolean;
}

function ImageControls({
  next,
  nextDisabled,
  prev,
  prevDisabled
}: ImageControlsProps) {
  return (
    <div className="ImageViewer__controls">
      <div
        className={classNames(
          'ImageViewer__controls__prev', prevDisabled && 'ImageViewer__control--disabled'
        )}
        onClick={prev}
      >
        <Button icon={{ icon: "Arrow" }} />
      </div>
      <div
        className={classNames(
          'ImageViewer__controls__next', nextDisabled && 'ImageViewer__control--disabled'
        )}
        onClick={next}
      >
        <Button icon={{ icon: "Arrow" }} />
      </div>
    </div>
  );
}

interface ImageProps extends PropsWithChildren {
  source: string;
  description?: string;
  isDialog: boolean;
}

function Image({ children, source, description, isDialog, ...imageProps }: ImageProps) {
  return (
    <div className="ImageViewer__imageContainer">
      <img {...imageProps} src={source} className="ImageViewer__image" />
      {children}
      {(isDialog && description) ? (
        <div className="ImageViewer__description">
          <Typography.Label>
            {description}
          </Typography.Label>
        </div>
      ) : null}
    </div>
  );
}
