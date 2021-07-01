
export type TodoType = {
    id: number,
    isChecked: boolean,
    tasks: string,
    status: TodoStatus,
    date: Date,
    time: Date
}
export enum TodoStatus {
    Paused, InProgress, Done
}