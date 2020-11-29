import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/Index.jsx';
import RisheilPic from '../../static/images/rish.png';

/* eslint-disable max-len */

export default function Welcome() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt="Risheil and me"
        src={RisheilPic}
        title="Risheil and Me"
      />
      <CardContent>
        <Typography id="header" gutterBottom variant="h5" component="h2">
          About Me
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Howdy, I am glad you are here. My name is Trevor Moore. I am currently studying at Texas A&M class of 2021. A-Whoop! I am currently looking for an internship for Summer 2021. My passions include powerlifting and water skiing. In the powerlift tab, you can see the different power lifting meets we had and the totals we achieved. Along with the current program I am doing and my current maxes.
        </Typography>
      </CardContent>
    </Card>
  );
}
