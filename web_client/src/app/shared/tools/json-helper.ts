export class JsonHelper {
  public static articleMember = ['category', 'content'];
  public static ABOUT_MEMBER = ['content'];

  /** Stringify specific members from JSON to object */
  public static toJson<T>(obj: T, member: string[]): void {
    for (const m of member) {
      obj[m] = JSON.stringify(obj[m]);
    }
    // return obj;
  }
  /** Parse specific members from JSON to object */
  public static toAny<T>(obj: T, member: string[]): void {
    for (const m of member) {
      obj[m] = JSON.parse(obj[m]);
    }
    // return obj;
  }
}
