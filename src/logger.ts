export class Logger {
 
 
    public static log(msg: string): void {
        console.log(msg);
    }

    public static error(msg: string): void {
        console.error("[Error]" , msg);
    }

    public static success(msg: string): void {
        console.log("[Success]" , msg);
    }

    public static warning(msg: string): void {
        console.warn("[Warning]",msg);
    }

    public static title(msg: string): void {
        console.log("\n--------------------------------------------------------------------------------");
        console.log(`    ${msg}                                                 `);
        console.log("--------------------------------------------------------------------------------");
    }


}