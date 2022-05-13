import { FC } from "react";
import CircleIcon from '@mui/icons-material/Circle';

interface IProps {
	item: string;
}

const Dot: FC<IProps> = ({item}) => {			
    let bg = "lightgray";
    if ( item === 'fail' ) bg = "red";
    if ( item === 'success' ) bg = "green";
    return <CircleIcon sx={{ color: bg, width: '6px', height: '6px' }}/>
}

export default Dot;
