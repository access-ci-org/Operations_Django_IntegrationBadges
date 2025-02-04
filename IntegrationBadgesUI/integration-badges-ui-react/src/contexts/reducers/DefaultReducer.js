export default function DefaultReducer(state, newState) {
    if (Array.isArray(state)) {
        return [
            ...state,
            ...newState
        ]
    } else if (typeof state === "number" || typeof state === "string" || state === null || state === undefined) {
        return newState
    } else if (typeof state === "object") {
        return {
            ...state,
            ...newState
        }
    }
}