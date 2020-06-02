import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Skeleton} from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

const getSexString = (sex: string) => {
    return sex === '1' ? 'Male' :
            sex === '2' ? 'Female' :
            'Unknown';
};

const textStyles = createStyles((theme: Theme) => ({
    primary: {

    },
    secondary: {

    }
}));

const useStyles = makeStyles(theme => ({
    section: {
        margin: theme.spacing(2, 0)
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
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg' :
        image;

    return (
        <div>
            <div className={classes.section}>
                <CaseDetailContentTitle title={'ID'} moreOnTitle={id}/>
            </div>

            <div className={classes.section}>
                <CaseDetailContentTitle title={'Basic Information'}/>
                <p>Sex: {getSexString(sex)}</p>
                <p>Age: {age}</p>
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
                {`${title}: `}
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

    useEffect(() => {
        let image: HTMLImageElement | null = new Image();
        image.src = url;
        image.onload = () => {
            setLoaded(true)
        };
        return () => {
            image = null;
        }
    }, []);

    if (loaded) {
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


