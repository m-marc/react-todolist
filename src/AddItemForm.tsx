import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
    //add new item on button click
    const handleClick = () => {
        if (stateTitle.trim() !== "") {
            addItem(stateTitle)
            setTitle("")
        } else setError("Title is required")
    }

    return <div>
        <TextField variant={"outlined"}
                   value={stateTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label={"Title"}
                   helperText={error}
        />
        <IconButton color={"primary"} onClick={handleClick}>
            <AddBox />
        </IconButton>
    </div>
}

export default AddItemForm