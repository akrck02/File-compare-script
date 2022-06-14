import { log } from "console";
import { Commands } from "./commands";
import { Parameters } from "./configuration";
import { Configuration } from "./configuration";

const fs = require('fs');

export class Service {

    private params : Parameters;

    /**
     * Create a new instance of the service
     * checking the compulsory parameters
     */
    constructor() {

        try {
            this.params = Configuration.ReadParamsFile();
            this.checkParams();
        } catch (e) {
            console.log(e);
            console.log("[INFO] The script has failed. Please check the logs.\n");
            process.exit(1);
        }

    }

    /**
     * Start the script execution
     */
    public start() {
        this.showTitle();
        try {
            console.log("Start at: ", new Date());
            this.compare();
    
        } catch (e) {
            console.log(e);
            console.log("[INFO] The script has failed. Please check the logs.\n");
            process.exit(1);
        }
    
    }

    /**
     * Show the fancy title of the script
     */
    private showTitle() {
        console.log("############################################################################################");
        console.log("                       Directory compare service by akrck02                                 ");
        console.log("############################################################################################\n");
    }

    /**
     * Check the compulsory parameters
     */
    private checkParams() {
    
        if (this.params.directory === undefined || this.params.directory === "") {
            console.log("[ERROR] No directory defined in params.json, exiting...");
            process.exit(1);
        }

        // if directory does not have a trailing slash add it
        if (this.params.directory.substring(-1) !== "/") {
            this.params.directory += "/";
        }
        
        
        if (this.params.compare === undefined || this.params.compare === "") {
            console.log("[ERROR] No compare directory defined in params.json, exiting...");
            process.exit(1);
        }

        // if directory does not have a trailing slash add it
        if (this.params.compare.substring(-1) !== "/") {
            this.params.compare += "/";
        }
    
    }

    /**
     * Compare the archives
     */
    private compare() {

        if(this.params.directory == null || !fs.existsSync(this.params.directory) || !Commands.isDirectory(this.params.directory)) {
            console.log("[ERROR] The directory '" + this.params.directory + "' does not exist, exiting...");
            process.exit(1);
        }

        this.access(this.params.directory, true);      
    
    }


    public access(file: string, root: boolean = false) {        

        let fileUrl = root? file : this.params.directory + "/" + file;	

        if(file == null || !fs.existsSync(fileUrl)) {
            console.log("[WARN] The file '" + fileUrl + "' does not exist, skipping...");
            return;
        }

        // Handle directories
        if(Commands.isDirectory(fileUrl)) {
            Commands.list(fileUrl).forEach(file => {
                this.access(file, false);
            });
        }        
        
        // Handle files
        if(Commands.isFile(this.params.directory + file)) {
            console.log("--------------------------------------------------------------------------------");
            console.log("[INFO] Comparing '" + file + "'...");
            console.log("--------------------------------------------------------------------------------");
            
            try {
                Commands.diff(this.params.directory + file, this.params.compare + file);
            } catch (e) {}
        }
    }

}

const service = new Service();
service.start();