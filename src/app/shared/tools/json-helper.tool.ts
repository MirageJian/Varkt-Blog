export class JsonHelperTool {
  public static articleMember = ['category', 'content'];

  public static toJson<T>(obj: T, member: string[]): void {
    for (const m of member) {
      obj[m] = JSON.stringify(obj[m]);
    }
    // return obj;
  }

  public static toAny<T>(obj: T, member: string[]): void {
    for (const m of member) {
      obj[m] = JSON.parse(obj[m]);
    }
    // return obj;
  }
}
