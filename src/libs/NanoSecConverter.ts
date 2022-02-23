export class NanoSecConverter {
    /**
     * Date型をUNIX時間(ナノ秒)に変換する
     */
    public static toUnixNs(date: Date): number {
        return date.getTime() * 1e6;
    }

    /**
     * ミリ秒をナノ秒に変換する
     */
    public static parseMs(ms: number): number {
        return ms * 1e6;
    }

    /**
     * UNIX時間(ナノ秒)からDate型に変換する
     */
    public static toDate(epocNs: number): Date {
        const epocMs = epocNs * 1e-6;
        return new Date(epocMs);
    }
}
