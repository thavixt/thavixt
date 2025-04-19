import classNames from "classnames";
import { PropsWithChildren, useMemo, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Dialog } from "../Dialog/Dialog";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import "./ImageViewer.css";

export interface ImageViewerImage {
  src: string;
  description?: string;
}

export interface ImageViewerProps extends Omit<CommonProps<HTMLImageElement>, 'src' | 'onChange'> {
  /** Image sources */
  src: (ImageViewerImage | string)[];
  /** Dialog title */
  title?: string;
  /** Preview width */
  width?: number;
  /** Preview height */
  height?: number;
  /** Preload images */
  preload?: boolean;
  /** Callback on image change */
  onChange?: (imageIndex: number, image: string | ImageViewerImage) => void;
}

export function ImageViewer({
  onChange, className, src, title, width = 300, height = 300, preload = true, ...imageProps
}: ImageViewerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const srcList = useMemo(() => Array.isArray(src) ? src : [src], [src]);
  const currentImage = srcList[index];
  const currentImageSrc = typeof currentImage === "string" ? currentImage : currentImage.src;
  const currentImageDesc = `${typeof currentImage === "string" ? '' : currentImage.description} (${index + 1}/${src.length})`;

  const onImageClick = () => setDialogOpen(true);
  const onDialogClosed = () => setTimeout(() => setDialogOpen(false), 150);

  const onNext = () => {
    setIndex(prev => {
      const next = Math.min(prev + 1, srcList.length - 1);
      const nextImg = srcList[next];
      onChange?.(next, nextImg);
      return next;
    });
  };
  const onPrev = () => {
    setIndex(prev => {
      const next = Math.max(prev - 1, 0);
      const prevImg = srcList[next];
      onChange?.(next, prevImg);
      return next;
    });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'ArrowLeft') {
      onPrev();
    }
    if (e.key === 'ArrowRight') {
      onNext();
    }
  }

  return (
    <div
      data-testid="ImageViewer"
      tabIndex={1}
      className={classNames('ImageViewer', className)}
      style={{ backgroundImage: `url("${currentImageSrc}")` }}
      onKeyDown={onKeyDown}
    >
      {preload
        ? srcList.map(img => {
          const source = typeof img === "string" ? img : img.src;
          return <link key={source} rel="preload" href={source} as="image"></link>;
        })
        : null
      }
      {dialogOpen ? (
        <Dialog
          data-testid="ImageViewerDialog"
          closeIcon
          open
          onClose={onDialogClosed}
          style={{ backgroundImage: `url("${currentImageSrc}")` }}
        >
          <>
            <div className="ImageViewer__filter"></div>
            <div className="ImageViewer__container">
              <Image dialog index={index} onClick={onImageClick} {...imageProps} source={currentImageSrc} title={title} description={currentImageDesc}>
                <ImageControls
                  dialog
                  next={onNext}
                  nextDisabled={index >= srcList.length - 1}
                  prev={onPrev}
                  prevDisabled={index <= 0}
                />
              </Image>
            </div>
          </>
        </Dialog>
      ) : null}
      <div className="ImageViewer__filter"></div>
      <div className="ImageViewer__container" style={{ maxWidth: width, maxHeight: height, width: '100%', height: '100%' }}>
        <Image index={index} onClick={onImageClick} {...imageProps} source={currentImageSrc} title={title} description={currentImageDesc}>
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
  dialog?: boolean;
}

function ImageControls({
  next,
  nextDisabled,
  prev,
  prevDisabled,
  dialog,
}: ImageControlsProps) {
  return (
    <div className="ImageViewer__controls">
      <div
        className={classNames(
          'ImageViewer__controls__prev',
          prevDisabled && 'ImageViewer__control--disabled'
        )}
        onClick={prev}
      >
        <Button data-testid={`ImageViewer${dialog ? 'Dialog' : ''}PrevButton`} icon={{ type: "Arrow" }} />
      </div>
      <div
        className={classNames(
          'ImageViewer__controls__next',
          nextDisabled && 'ImageViewer__control--disabled'
        )}
        onClick={next}
      >
        <Button data-testid={`ImageViewer${dialog ? 'Dialog' : ''}NextButton`} icon={{ type: "Arrow" }} />
      </div>
    </div>
  );
}

interface ImageProps extends PropsWithChildren {
  source: string;
  description?: string;
  title?: string;
  index: number;
  dialog?: boolean;
}

function Image({ children, source, title, description, index, dialog, ...imageProps }: ImageProps) {
  return (
    <div className="ImageViewer__imageContainer">
      <img data-testid={`ImageViewer${dialog ? 'Dialog' : ''}Image${index}`} {...imageProps} src={source} className="ImageViewer__image" />
      {children}
      {description ? (
        <div className="ImageViewer__description">
          <Typography.Body>{title}</Typography.Body>
          <Typography.Label>{description}</Typography.Label>
        </div>
      ) : null}
    </div>
  );
}
