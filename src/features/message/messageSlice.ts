import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Message {
    status: 'success' | 'error'
    message: string
}

interface MessageState {
    msgQueue: Message[]
}

const initialState: MessageState = {
    msgQueue: [],
};

export const pushMessage = createAsyncThunk(
    'message/push',
    async ({status, message}: Message, thunkApi) => {
        thunkApi.dispatch(push({status, message}));
        await new Promise((resolve) => setTimeout(resolve, 5000));
        thunkApi.dispatch(pop());
    },
);

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        push: (state, action: PayloadAction<Message>)=>{
            state.msgQueue.push(action.payload);
        },
        pop: (state)=>{
            state.msgQueue.shift();
        },
        clear: (state)=>{
            state.msgQueue = [];
        },
    },
    extraReducers: () => {
    },
});

export const {push, pop, clear} = messageSlice.actions;
export default messageSlice.reducer;
