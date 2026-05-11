export class GetError {
  public static getMessage(error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return error;
  }
}
