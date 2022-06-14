const fs = require('fs');


export interface Parameters {
    directory? : string,
    compare? : string
}


export class Configuration {

    static MEDIA_DIR = './media/';
    static REPOSITORIES_FILE = Configuration.MEDIA_DIR + 'repos.json';
    static PARAMETERS_FILE = Configuration.MEDIA_DIR + 'params.json';
    
    /**
     * Reads the parameters file 
     * and returns the parameters object
     * @returns script parameters
     */
    public static ReadParamsFile () : Parameters{

        let params : Parameters = {};
        
        if (fs.existsSync(Configuration.PARAMETERS_FILE)) {
            const paramsFile = fs.readFileSync(Configuration.PARAMETERS_FILE, 'utf8');
            params = JSON.parse(paramsFile);
        } else {
            throw '[ERROR] No params file found';
        }
    
        return params;
    }
    


}