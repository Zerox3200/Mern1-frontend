import './MainList.css';
import './ChangeMood.css';
import { TasksList } from './TasksList.js';
import Sun from './icon-sun.svg';
import Moon from './icon-moon.svg';
import Background1 from './../../images/bg-desktop-dark.jpg';
import Background2 from './../../images/bg-desktop-light.jpg'
import { useState } from 'react';

export function MainTodo(prop) {
    const [Mood, setMood] = useState(Moon);
    const [Color, SetColor] = useState("Main");
    const [NightMoodPhoto, setNightMoodPhoto] = useState(Background1);
    const [MainTodo, setMainTodo] = useState("MainList_pt2_1");
    const [MainTodo2, setMainTodo2] = useState("MainList_pt2_2_tasks")
    const [MainTodoFoot, setMainTodoFoot] = useState("MainList_pt2_3")
    const ChangeMood = () => {
        console.log("Change");
        if (Mood === Sun) {
            setNightMoodPhoto(Background1);
            setMood(Moon);
            SetColor("Main");
            setMainTodo("MainList_pt2_1")
            setMainTodo2("MainList_pt2_2_tasks")
            setMainTodoFoot("MainList_pt2_3")
        } else if (Mood === Moon) {
            setNightMoodPhoto(Background2);
            setMood(Sun);
            SetColor("Main_lightMood");
            setMainTodo("MainList_pt2_1LightMood");
            setMainTodo2("MainList_pt2_2_tasksLightMood")
            setMainTodoFoot("MainList_pt2_3LightMood")
        }
    }
    return (
        <div className={Color}>
            <img src={NightMoodPhoto} alt='img' />
            <div className="MainList">
                <div className='MainList_pt1'>
                    <p>TODO</p>
                    <img src={Mood} alt='img' onClick={ChangeMood} />
                </div>
                <div className='MainList_pt2'>
                    <TasksList MainClass={MainTodo} MainClass2={MainTodo2} Foot={MainTodoFoot} />
                </div>
            </div>
        </div>
    )
}