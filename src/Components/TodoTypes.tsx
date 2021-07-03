
export type TodoType = {
    id: number,
    isChecked: boolean,
    tasks: string,
    status: TodoStatus,
    date: Date,
    time: Date
}
export enum TodoStatus {
    InProgress = 1, Paused = 2
}
export interface FieldTodoTypes {
    [key: string]: string;
}
