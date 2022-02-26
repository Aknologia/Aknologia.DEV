export default abstract class Utils {
  public static durationToString(duration: number) {
    let dur = duration / 1e3;

    const days = Math.floor(dur / 86400);
    dur -= days * 86400;
    const hours = Math.floor(dur / 3600);
    dur -= hours * 3600;
    const minutes = Math.floor(dur / 60);
    dur -= minutes * 60;

    return `${days > 0 ? `${days}d` : ''}${hours > 0 ? `${hours}h` : ''}${
      minutes > 0 ? `${minutes}m` : ''
    }${dur}s`;
  }
}
