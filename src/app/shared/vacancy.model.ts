export class vacancy{
    constructor(public buissnessUnit:String[], 
        public jobRole: String[], 
        public buHead: String[], 
        public band: String[],
        public location: String[], 
        public primarySkills :object[], 
        public Experience: number, 
        public vacancies: number, 
        public hiringManager: String[], 
        public recruiter: String[],
        public jobDescription : String,
        public endDate : Date
        ){} 
}