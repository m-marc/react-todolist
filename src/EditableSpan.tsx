import React, {ChangeEvent, EventHandler, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = ({title, onChange}) => {
    const [editMode, setEditMode] = useState(false)
    const [stateTitle, setStateTitle] = useState("")

    const setEditableMode = () => {
        setEditMode(true)
        setStateTitle(title)
    }
    const setViewMode = () => {
        setEditMode(false)
        onChange(stateTitle)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setStateTitle(e.currentTarget.value)

    return editMode
        ? <input value={stateTitle} type="text" onBlur={setViewMode} onChange={onChangeInputHandler} autoFocus />
        : <span onDoubleClick={setEditableMode}>{title}</span>
}

export default EditableSpan