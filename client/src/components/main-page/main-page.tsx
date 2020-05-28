import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Banner from "./banner";
import Section from "./section";

const mockDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
const sectionsData = [
    {
        title: 'Clinical Characteristics',
        description: mockDescription,
        link: '/'
    },
    {
        title: 'Clinical Laboratory Data',
        description: mockDescription,
        link: '/'
    },
    {
        title: 'Imaging Materials',
        description: mockDescription,
        link: '/'
    }
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    banner: {
        width: '100%',
        backgroundColor: '#eee',
    },
    widthWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sections: {
        width: '100%',
        maxWidth: theme.breakpoints.values.md,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    sectionWrapper: {
        width: '33%',
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    }
}));

const MainPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.banner}>
                <Banner />
            </div>
            <div className={classes.widthWrapper}>
                <div className={classes.sections}>
                    {
                        sectionsData.map((section, i) => (
                            <div className={classes.sectionWrapper}>
                                <Section title={section.title} link={section.link} description={section.description} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default MainPage
