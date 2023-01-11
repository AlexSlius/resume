import uuid from "react-uuid";

const initialSkills = [
   {
      name: 'Communication',
      level: 4,
      selected: false,
      id: uuid()
   }
   , {
      name: 'Dashboard',
      level: 0,
      selected: false,
      id: uuid()
   }
   ,
   {
      name: 'Responsive Web Design',
      level: 0,
      selected: false,
      id: uuid()

   },
   {
      name: 'Prototyping',
      level: 0,
      selected: false,
      id: uuid()
   },
   {
      name: 'User Interface Design',
      level: 0,
      selected: false,
      id: uuid()
   },
   {
      name: 'PHP',
      level: 0,
      selected: false,
      id: uuid()

   }
];
export default initialSkills;