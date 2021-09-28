export function computeTimeInterval(timeSpan: string){
  const now = new Date().getTime();
  switch (timeSpan) {
    case '1h':
      return new Date(now - 60*60*1000);
    case '6h':
      return new Date(now - 60*60*6*1000);
    case '12h':
      return new Date(now - 60*60*12*1000);
    case '1d':
      return new Date(now - 60*60*24*1000);
    case '1w':
      return new Date(now - 60*60*24*7*1000);
    case '1M':
      return new Date(now - 60*60*24*30*1000);
    case '0a':
      return new Date(now - 20*12*60*60*24*30*1000);
    default:
      return new Date(now - 20*12*60*60*24*30*1000);
  }

}