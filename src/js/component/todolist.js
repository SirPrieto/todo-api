import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/sirprieto";
	useEffect(() => getFetch(), []);

	// START getFetch Function

	const getFetch = () => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then((responseAsJson) => {
				// Do stuff with the JSONified response
				console.log(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	};
	// END getFetch Function

	// START putFecth Function

	// END putFecth Function

	// START delete/update Fecth Function

	const updateFetch = (data) => {
		fetch(url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log("Success:", response);
				getFetch();
			})
			.catch((error) => console.error("Error:", error));
	};
	// END delete Fecth Function

	const targetValue = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);
	};

	const createTask = (e) => {
		if (e.keyCode == 13) {
			setTaskList([...taskList, { label: inputValue, done: false }]);
			setInputValue("");
			updateFetch([...taskList, { label: inputValue, done: false }]);
		}
	};

	const deleteTask = (deletePosition) => {
		const deleteValue = taskList.filter(
			(taskDelete, index) => deletePosition != index
		);
		setTaskList(deleteValue);
		updateFetch(deleteValue);
	};

	const markDone = (index) => {
		const newTodos = taskList.map((task, i) => {
			if (i == index) {
				task.done = !task.done;
				return task;
			} else {
				return task;
			}
		});
		setTaskList(newTodos);
		updateFetch(newTodos);
	};

	return (
		<div className="todo-list">
			<h1> To-Do List</h1>
			<input
				className="mb-4"
				placeholder="Add Something"
				type="text"
				value={inputValue}
				onChange={targetValue}
				onKeyDown={createTask}
			/>
			<ul className="list-group">
				{taskList.map((task, index) => {
					return (
						<li className="list-group-item" key={index}>
							{task.label}
							<span
								onClick={() => {
									deleteTask(index);
								}}>
								<FontAwesomeIcon
									className="iconPosition"
									icon={faTrashCan}></FontAwesomeIcon>
							</span>
							<span
								className={task.done ? "done" : ""}
								onClick={() => {
									markDone(index);
								}}>
								<FontAwesomeIcon
									className="iconPosition"
									icon={faCheckSquare}></FontAwesomeIcon>
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
