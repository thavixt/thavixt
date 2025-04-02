export function formatSize(fileSize: number, decimalPlaces: number = 1) {
  if (typeof fileSize !== 'number' || isNaN(fileSize)) {
    throw new Error('File size must be a number');
  }
  
  const size = Math.abs(fileSize);
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  if (size < 1024) {
    return `${size} ${units[0]}`;
  }
  
  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const formattedSize = (size / Math.pow(1024, exponent)).toFixed(decimalPlaces);
  
  return `${formattedSize} ${units[exponent]}`;
}
