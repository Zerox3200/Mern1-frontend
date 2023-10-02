import { useEffect, useState } from 'react';
import './MainList.css'
import Close from './icon-cross.svg'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FetchedTasks } from '../../rtk/Reducers/slice';
import Swal from 'sweetalert2';

export function TasksList(prop) {
    const MainTasks = useSelector((state) => state.Tasks).GetAllTasks;
    const Dispatch = useDispatch();
    useEffect(() => {
        Dispatch(FetchedTasks("http://localhost:3000/GetTasks"));
    }, [])
    // CheckBox.........................................................................................................
    const CheckBox = (e, Title) => {
        if (e.className === "MainList_pt2_2_tasks_1_checkbox_notChecked") {
            e.className = "MainList_pt2_2_tasks_1_checkbox"
            axios.patch("http://localhost:3000/EditStatus/Completed", { Title }).then(() => {
                Dispatch(FetchedTasks("http://localhost:3000/GetTasks"));
            })
        } else if (e.className === "MainList_pt2_2_tasks_1_checkbox") {
            axios.patch("http://localhost:3000/EditStatus2/Active", { Title }).then(() => {
                Dispatch(FetchedTasks("http://localhost:3000/GetTasks"));
            })
            e.className = "MainList_pt2_2_tasks_1_checkbox_notChecked"
        }
    }
    // Send data from API................................................................................................
    const [Task, setTask] = useState();
    const [Completed, setCompleted] = useState("Active");
    const SendData = async (e) => {
        await axios.post("http://localhost:3000/AddingTask", {
            Title: Task,
            Status: Completed
        }).then(() => {
            Dispatch(FetchedTasks("http://localhost:3000/GetTasks"));
            document.querySelector(`.MainList_pt2_1 input`).value = null
        })

    }
    const DeleteTask = (TaskTitle) => {
        console.log("Delete task")
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                ).then(() => {
                    axios.delete(`http://localhost:3000/DeleteTask/${TaskTitle}`).then(() => {
                        Dispatch(FetchedTasks("http://localhost:3000/GetTasks"));
                    })
                })
            } else if (result.isDismissed) {
                console.log("Cancel delete")
                return;
            }
        })
    }
    const FilterActive = async () => {
        Dispatch(FetchedTasks("http://localhost:3000/GetActive"));
    }
    const FilterAll = async () => {
        Dispatch(FetchedTasks("http://localhost:3000/GetTasks"))
    }
    const FilterCompleted = async () => {
        Dispatch(FetchedTasks("http://localhost:3000/CompletedActive"))
    }
    const ClearCompleted = async () => {
        axios.delete("http://localhost:3000/DeleteAllCompleted").then(() => {
            Dispatch(FetchedTasks("http://localhost:3000/GetTasks"));
        });
    }
    return (
        <>
            <div className={prop.MainClass}>
                <p onClick={SendData}>Add Task</p>
                <input type='text' onChange={(e) => {
                    setTask(e.target.value);
                }} />
            </div>
            {Array.isArray(MainTasks) ? MainTasks.map((Task) => {
                return (
                    <div className={prop.MainClass} key={Task._id}>
                        <div className={prop.MainClass2}>
                            <div className='MainList_pt2_2_tasks_1'>
                                <div className={Task.Status === "Active" ?
                                    "MainList_pt2_2_tasks_1_checkbox_notChecked" : "MainList_pt2_2_tasks_1_checkbox"}
                                    onClick={(e) => CheckBox(e.target, Task.Title)}></div>
                                <p className={Task.Status === "Active" ? "" : "Marked"}>{Task.Title}</p>
                            </div>
                            <img src={Close} alt='close' onClick={() => DeleteTask(Task.Title)} />
                        </div>
                    </div>
                )
            }) : null}
            <div className={prop.Foot}>
                <p>{!Array.isArray(MainTasks) ? 0 : MainTasks.length} items left</p>
                <p onClick={FilterAll}>All</p>
                <p onClick={() => FilterActive()}>Active</p>
                <p onClick={FilterCompleted}>Completed</p>
                <p onClick={ClearCompleted}>Clear Completed</p>
            </div>
        </>
    )
}