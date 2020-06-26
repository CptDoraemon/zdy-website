import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const DEV_IMAGE_URL = 'https://s1.ax1x.com/2020/06/01/t35GOe.jpg';
const getSexString = (sex: string) => {
    const _sex = `${sex}`;
    return _sex === '1' ? 'Male' :
            _sex === '2' ? 'Female' :
            'Unknown';
};

const useStyles = makeStyles(theme => ({
    section: {
        margin: theme.spacing(2, 0),
        '&:first-of-type': {
            margin: theme.spacing(0, 0, 2, 0),
        },
        '&:last-of-type': {
            margin: theme.spacing(2, 0, 0, 0),
        }
    },
}));

interface CaseDetailContentProps {
    id: string,
    sex: string,
    age: string,
    image: string
}

const CaseDetailContent: React.FC<CaseDetailContentProps> = ({id, sex, age, image}) => {
    const classes = useStyles();
    const imageUrl = process.env.REACT_APP_DEBUG === 'true' ?
        DEV_IMAGE_URL :
        image;

    return (
        <div>
            <div className={classes.section}>
                <CaseDetailContentTitle title={'ID'} moreOnTitle={id}/>
            </div>

            <div className={classes.section}>
                <CaseDetailContentTitle title={'Basic Information'}/>
                <CaseDetailContentRow keyName={'sex'} value={getSexString(sex)}/>
                <CaseDetailContentRow keyName={'age'} value={age}/>
            </div>

            <div className={classes.section}>
                <CaseDetailContentTitle title={'Details'}/>
            </div>

            <div className={classes.section}>
                <CaseDetailContentTitle title={'Images'}/>
                <CaseDetailContentImage url={imageUrl} />
            </div>
        </div>
    )
};


const useContentRowStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0, 0, 0, 2)
    },
    keyName: {
        textTransform: 'capitalize'
    }
}));

interface CaseDetailContentRowProps {
    keyName: string,
    value: string
}

const CaseDetailContentRow: React.FC<CaseDetailContentRowProps> = ({keyName, value}) => {
    const classes = useContentRowStyles();
    return (
        <div className={classes.root}>
            <span className={classes.keyName}>
                {`${keyName}: `}
            </span>
            <span>
                {value}
            </span>
        </div>
    )
};


const useContentStyles = makeStyles(theme => ({
    root: {
        textTransform: 'uppercase',
    },
    moreOnTitle: {
        color: theme.palette.secondary.dark
    }
}));

interface CaseDetailContentTitleProps {
    title: string,
    moreOnTitle?: string
}

const CaseDetailContentTitle: React.FC<CaseDetailContentTitleProps> = ({title, moreOnTitle}) => {
    const classes = useContentStyles();

    return (
        <Typography variant={'h6'} component={'h2'} color={"primary"} className={classes.root}>
            <Box fontWeight={700}>
                {moreOnTitle ? `${title}: ` : title}
                {
                    moreOnTitle &&
                    <Box fontWeight={700} component={'span'} className={classes.moreOnTitle}>
                        {moreOnTitle}
                    </Box>
                }
            </Box>
        </Typography>
    )
};


const useImageStyles = makeStyles(theme => ({
    image: {
        maxWidth: 300,
        maxHeight: 300,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            maxHeight: 300,
        }
    },
    imageLoading: {
        width: 300,
        height: 300,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {

        }
    }
}));

interface CaseDetailContentImageProps {
    url: string
}

const CaseDetailContentImage: React.FC<CaseDetailContentImageProps> = ({url}) => {
    const classes = useImageStyles();

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let image: HTMLImageElement | null = new Image();
        image.src = url;
        image.onload = () => {
            setLoaded(true)
        };
        image.onerror = () => {
            setError(true)
        };
        return () => {
            image = null;
        }
    }, []);

    if (error) {
        return (
            <div className={classes.imageLoading} title={'No image related to this case found'}>
                <BrokenImageIcon color={"secondary"}/>
            </div>
        )
    } else if (loaded) {
        return (
            <img className={classes.image} src={url} alt='case detail' />
        )
    } else {
        return (
            <div className={classes.imageLoading}>
                <CircularProgress disableShrink/>
            </div>
        )
    }
};

export default CaseDetailContent


