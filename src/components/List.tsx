import React, { FC, useState } from 'react'
import { Box, TextField, Typography, Button } from '@material-ui/core'
import { styled } from '@mui/material/styles';

import { IItem } from '../models/IItem'

import ListItem from './ListItem';

const AnswerBlock = styled(Box)(() => ({
    margin: '0 10px 0 10px', 
    padding: '5px 10px',
    borderRadius: '15px',
    fontWeight: 700,
    backgroundColor: 'lightgray'
}));

const initialValues = {
    first: '',
    answer: '',
    second: ''
};

const List: FC = () => {

    const [ list, setList ] = useState<IItem[]>([])
    const [ values, setValues ] = useState(initialValues);
    const { first, answer, second } = values

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const createItem = () => {

        if ( !answer ) return

        setList((prev: any) => [ ...prev, {
            title: first,
            title2: second,
            answer: answer
        } ])
    }

    return (
        <Box>
            <Box>
                <Box sx={{ mb: 1, p: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography>{first}</Typography>
                    <AnswerBlock>{answer}</AnswerBlock>
                    <Typography>{second}</Typography>
                </Box>
                <TextField 
                    fullWidth
                    variant='outlined'
                    name='first'
                    placeholder='First part text'
                    value={first}
                    onChange={handleInputChange}
                />
                <TextField 
                    fullWidth
                    variant='outlined'
                    name='answer'
                    placeholder='Answer'
                    value={answer}
                    onChange={handleInputChange}
                />
                <TextField 
                    fullWidth
                    variant='outlined'
                    name='second'
                    placeholder='Second part text'
                    value={second}
                    onChange={handleInputChange}
                />
                <Button variant='contained' onClick={() => {
                    createItem()
                    setValues({ first: '', answer: '', second: '' })
                }}>Добавить</Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {list && list.map((item: IItem) => (
                    <ListItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </Box>
            
        </Box>
    )
}

export default List