export class vacancy{
    constructor(public buissnessUnit:String[], 
        public primarySkills :String[], 
        public Experience: String[], 
        public vacancies: String[], 
        public buHead: String[], 
        public hiringManager: String[], 
        public band: String[],
        public jobDescription: String[], 
        public location: String[], 
        public recruiter: String[]
        ){} 

    setDefault(a:string[]){
        this.buissnessUnit = a;
          //  this.primarySkills = t[1];
          //  this.Experience = t[2];
          //  this.vacancies = t[3];
          //  this.buHead = t[4];
          //  this.hiringManager = t[5];
          //  this.band = t[6];   
          //  this.jobDescription = t[7];
          //  this.location = t[8];
          //  this.recruiter = t[9];
    }


}