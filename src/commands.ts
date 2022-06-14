import { existsSync, lstatSync, readdirSync } from "fs";

const { execSync } = require("child_process");

export class Commands {

    public static makeDirectory(directory: string): void {
        execSync(`mkdir -p ${directory}`,{stdio: 'inherit'});
    }

    public static diff(file: string, compare:string){
        execSync(`diff ${file} ${compare}`,{stdio: 'inherit'});
    }
        
    public static existsDirectory(dir : string) : boolean {
        return existsSync(dir) && lstatSync(dir).isDirectory();
    }

    public static list(dir : string) : string[] {
       return readdirSync(dir);
    }

    public static isDirectory(file : string) : boolean {
        return this.existsDirectory(file) && lstatSync(file).isDirectory();
    }

    public static isFile(file : string) : boolean {
        return existsSync(file) && lstatSync(file).isFile();
    }


}