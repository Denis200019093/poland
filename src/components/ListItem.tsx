import React, { useState, useEffect, FC, useReducer } from 'react'
import { Box, TextField, Typography } from '@material-ui/core'
import { styled } from '@mui/material/styles';

import { IItem } from '../models/IItem'

import useDebounce from '../hooks/useDebounce';
import Dot from './Dot';

interface IProps {
    item: IItem
}    

const ATTEMPTS_LIMIT = 3;

const init = () => ({
    attempts: Array.from({ length: ATTEMPTS_LIMIT }).map((_) => "idle"),
    step: 0
});

function attemptsReducer(state: any, action: any) {
    const { status } = action;
    
    const currentIndex = state.attempts.findIndex((a: string | number) => a === "idle");
    const newAttempts = state.attempts;

    newAttempts[currentIndex] = status;

    return { 
        attempts: newAttempts, 
        step: state.step + 1
    };
}

const Item = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0'
}));

const HidenBox = styled(Box)(() => ({
    margin: '0 0 0 5px', 
    padding: '8px 20px', 
    border: '2px solid lightgreen',
    boxShadow: '0 0 3px lightgreen',
    fontWeight: 500, 
    borderRadius: '50px'
}));

const TextFill = styled(TextField)(() => ({
    margin: '0 0 0 5px'
}));

const ListItem: FC<IProps> = ({item}) => {

    const [ value, setValue ] = useState<string>('')
    const [ state, dispatch ] = useReducer(attemptsReducer, {}, init);
    const answer = item.answer.toLowerCase()
    const debounced = useDebounce(handleSubmit, 1000, value)
    
    //
    useEffect(() => {
        if ( value.toLowerCase() === answer ) {
            dispatch({ status: "success" });
        }
    }, [answer, value])
    
    function handleSubmit () {
        if ( state.attempts.includes("success") || ATTEMPTS_LIMIT === state.step ) return
        if ( value.toLowerCase() === answer ) {
            dispatch({ status: "success" });
        } else {
            dispatch({ status: "fail" });
        }
    };

    const change = (e: any) => {
        setValue(e.target.value)
        debounced(e.target.value)
    }
    
    return (

        <Item>
            <Typography component="h3">{item.title}</Typography>
            <Box>
                {state.attempts.includes("success") || 
                    ATTEMPTS_LIMIT === state.step ?
                    <HidenBox>{answer}</HidenBox>    
                :
                    <TextFill
                        variant="outlined"
                        type='text'
                        size='small'
                        value={value}
                        onChange={change}
                        disabled={
                            state.attempts.includes("success") || 
                                ATTEMPTS_LIMIT === state.step
                        }
                    />
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0 7px' }}>
                {state.attempts.map((item: string, index: number) => (
                    <Dot
                        key={index}
                        item={item}
                    />
                )).reverse()}
            </Box>
            <Typography component='h3'>{item.title2}</Typography>
        </Item>
    )
}

export default ListItem