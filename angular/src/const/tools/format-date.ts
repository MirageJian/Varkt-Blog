export class FormatDate {

    public static newDatetime() {
        return new Date().toLocaleString('zh-hans', {hour12: false}).replace(/\//g, '-');
    }

    public static newTime() {
        return new Date().toLocaleTimeString('zh-hans', {hour12: false});
    }

    public static hansDatetime(date: any) {
        if (date == null) {
            return null;
        }
        return new Date(date).toLocaleString('zh-hans', {hour12: false}).replace(/\//g, '-');
    }
}
