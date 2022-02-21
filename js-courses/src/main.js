import courseData from'./config/coursData.json'
import {getRandomCourse} from "./util/randomCours";
const N_COURSES=100;
function createCourses(){
    const courses=[]
    for(let i=0;i<N_COURSES;i++)
        courses.push((getRandomCourse(courseData)))
    return courses
}

