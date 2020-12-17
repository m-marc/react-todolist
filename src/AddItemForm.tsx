import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {

    const [stateTitle, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") handleClick()
    }
    //adding new item on button click
    const handleClick = () => {
        if (stateTitle.trim() !== "") {
            addItem(stateTitle)
            setTitle("")
        } else setError("Title is required")
    }

    return <div>
        <input value={stateTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <button onClick={handleClick}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}

export default AddItemForm