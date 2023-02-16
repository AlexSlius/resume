import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const marks = [
    {
        value: 0,
    },
    {
        value: 25,
    },
    {
        value: 50,
    },
    {
        value: 75,
    },
    {
        value: 100,
    },
];

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#DADCE3' : '#DADCE3',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 13,
        width: 13,
        backgroundColor: '#546C97',
        boxShadow: 'none',
        // '&:focus, &:hover, &.Mui-active': {
        //     boxShadow:
        //         '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        //     // Reset on touch devices, it doesn't add specificity
        //     '@media (hover: none)': {
        //         boxShadow: iOSBoxShadow,
        //     },
        // },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#DADCE3',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#DADCE3',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));

export default function CustomizedSlider({
    defaultValue = 0,
    valueLabelDisplay = "off",
    label = "",
    textLeft = "",
    textRight = "",
}) {
    return (
        <Box>
            <Typography gutterBottom>{label}</Typography>
            <div className="wrapper-ranges">
                <div className='ite-t-r'>{textLeft}</div>
                <IOSSlider
                    aria-label="ios slider"
                    defaultValue={defaultValue}
                    marks={marks}
                    valueLabelDisplay={valueLabelDisplay}
                />
                <div className='ite-t-r'>{textRight}</div>
            </div>
        </Box>
    );
}